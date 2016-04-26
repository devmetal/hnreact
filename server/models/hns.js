import Firebase from 'firebase';

const ref = new Firebase('https://hacker-news.firebaseio.com/v0/');

const isStory = (x) => x.type === 'story';
const hasUrl = (x) => x.url && x.url.length > 0;

const keysAsync = (table, limit = 50) => {
  return new Promise((resolve) => {
    ref.child(table).limitToFirst(limit).once('value', (snap) => {
      resolve(snap.val());
    });
  });
};

const retreiveAsync = (key) => {
  return new Promise((resolve) => {
    ref.child('item').child(key).once('value', snap => resolve(snap.val()));
  });
};

export async function topstories(limit) {
  const storyKeys = await keysAsync('topstories', limit);
  const stories = await Promise.all(storyKeys.map(retreiveAsync));
  return stories.filter(s => isStory(s) && hasUrl(s));
}

export async function newstories(limit) {
  const storyKeys = await keysAsync('newstories', limit);
  const stories = await Promise.all(storyKeys.map(retreiveAsync));
  return stories.filter(s => isStory(s) && hasUrl(s));
}
