import Firebase from 'firebase';
import Immutable from 'immutable';
import Rx from 'rxjs/Rx';

const ref = new Firebase('https://hacker-news.firebaseio.com/v0/');

const isStory = (x) => x.type === 'story';
const hasUrl = (x) => x.url && x.url.length > 0;

const storeLimit = 200;

let topstoriesList = new Immutable.List();
let newstoriesList = new Immutable.List();

const keysAsync = (table, limit = 50) => {
  return new Promise((resolve) => {
    ref.child(table).limitToFirst(limit).once('value', (snap) => {
      resolve(snap.val());
    });
  });
};

const retreiveAsync = (id) => {
  return new Promise((resolve) => {
    ref.child('item').child(id)
      .once('value', snap => resolve(snap.val()));
  });
};

const retrive = (item) => {
  return Rx.Observable.fromPromise(retreiveAsync(item.val))
    .map(retreived => {
      return { key: item.key, val: retreived };
    });
};

const itemObservable = (item) => {
  const tref = ref.child('item').child(item.val);
  return Rx.Observable.fromEvent(tref, 'value')
    .map(snap => {
      return { key: item.key, val: snap.val() };
    });
};

const childAddedObservable = (table) => {
  const tref = ref.child(table).limitToFirst(storeLimit);
  return Rx.Observable.fromEvent(tref, 'child_added')
    .map(snap => {
      return { key: snap.key(), val: snap.val() };
    })
    .mergeMap(item => {
      return itemObservable(item);
    });
};

const childChangedObservable = (table) => {
  const tref = ref.child(table).limitToFirst(storeLimit);
  return Rx.Observable.fromEvent(tref, 'child_changed')
    .map(snap => {
      return { key: snap.key(), val: snap.val() };
    })
    .concatMap(item => {
      return retrive(item);
    });
};

childAddedObservable('topstories').subscribe(item => {
  const index = topstoriesList.findIndex(i => i.id === item.val.id);
  if (index === -1) {
    topstoriesList = topstoriesList.set(item.key, item.val);
    console.log(`Added: key = ${item.key}, value = ${item.val.title}`);
  } else {
    topstoriesList = topstoriesList.set(index, item.val);
    console.log(`Updated: index: ${index}`);
  }
});

childChangedObservable('topstories').subscribe(item => {
  console.log(`Changed key = ${item.key}, value = ${item.val.title}`);
  topstoriesList = topstoriesList.set(item.key, item.val);
});

export async function topstories(limit) {
  if (limit <= storeLimit) {
    return topstoriesList
      .filter(isStory)
      .filter(hasUrl)
      .take(limit)
      .toArray();
  }

  const storyKeys = await keysAsync('topstories', limit);
  const stories = await Promise.all(storyKeys.map(retreiveAsync));
  return stories.filter(s => isStory(s) && hasUrl(s));
}

export async function newstories(limit) {
  const storyKeys = await keysAsync('newstories', limit);
  const stories = await Promise.all(storyKeys.map(retreiveAsync));
  return stories.filter(s => isStory(s) && hasUrl(s));
}
