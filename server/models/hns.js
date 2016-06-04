import Firebase from 'firebase';
import Immutable from 'immutable';
import Rx from 'rxjs/Rx';

const ref = new Firebase('https://hacker-news.firebaseio.com/v0/');

const hasUrl = (x) => x.url && x.url.length > 0;
const isStory = (x) => x.type === 'story';
const storyFilter = (x) => hasUrl(x) && isStory(x);

const storeLimit = 200;

let topstoriesList = new Immutable.List();
let newstoriesList = new Immutable.List();

const topstoriesRef = ref.child('topstories').limitToFirst(storeLimit);
const newstoriesRef = ref.child('newstories').limitToFirst(storeLimit);
const itemRef = ref.child('item');

const retreiveAsync = id => new Promise(resolve => {
  itemRef.child(id).once('value', snap => resolve(snap.val()));
});

const keysAsync = (table, limit = 50) => new Promise((resolve) => {
  ref.child(table).limitToFirst(limit).once('value', (snap) => {
    resolve(snap.val());
  });
});

const fetchAll = (ids) => {
  const promise = Promise.all(ids.map(id => retreiveAsync(id)));
  return Rx.Observable.fromPromise(promise);
};

Rx.Observable.fromEvent(topstoriesRef, 'value')
  .map(snap => snap.val())
  .switchMap(ids => fetchAll(ids))
  .subscribe(items => {
    topstoriesList = new Immutable.List(items);
  });

Rx.Observable.fromEvent(topstoriesRef, 'child_changed')
  .map(snap => {
    return { key: snap.key(), id: snap.val() };
  })
  .mergeMap(item => {
    const promise = retreiveAsync(item.id)
      .then(val => Object.assign(item, { val }));

    return Rx.Observable.fromPromise(promise);
  })
  .subscribe(item => {
    topstoriesList = topstoriesList.set(item.key, item.value);
  });

Rx.Observable.fromEvent(newstoriesRef, 'value')
  .map(snap => snap.val())
  .switchMap(ids => fetchAll(ids))
  .subscribe(items => {
    newstoriesList = new Immutable.List(items);
  });

export async function topstories(limit) {
  if (limit <= storeLimit) {
    return topstoriesList.filter(storyFilter).take(limit).toArray();
  }

  const storyKeys = await keysAsync('topstories', limit);
  const stories = await Promise.all(storyKeys.map(retreiveAsync));
  return stories.filter(s => isStory(s) && hasUrl(s));
}

export async function newstories(limit) {
  if (limit <= storeLimit) {
    return newstoriesList.filter(storyFilter).take(limit).toArray();
  }

  const storyKeys = await keysAsync('newstories', limit);
  const stories = await Promise.all(storyKeys.map(retreiveAsync));
  return stories.filter(s => isStory(s) && hasUrl(s));
}
