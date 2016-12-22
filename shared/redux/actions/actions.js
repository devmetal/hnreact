import * as ActionTypes from '../constants/constants';
import Config from '../../../server/config';
import fetch from 'isomorphic-fetch';

const baseURL = typeof window === 'undefined' ? process.env.BASE_URL || (`http://localhost:${Config.port}`) : '';

export function incraseLimit(by = 50) {
  return {
    type: ActionTypes.INCRASE_LIMIT,
    by,
  };
}

export function addStories(stories) {
  return {
    type: ActionTypes.ADD_STORIES,
    isFetching: false,
    stories,
  };
}

export function addStoriesRequest() {
  return {
    type: ActionTypes.ADD_STORIES_REQUEST,
    isFetching: true,
  };
}

export function addStoriesFailed(error) {
  return {
    type: ActionTypes.ADD_STORIES_FAILED,
    isFetching: false,
    error,
  };
}

export function fetchStories() {
  return (dispatch, getState) => {
    dispatch(addStoriesRequest());
    const { limit } = getState();

    return fetch(`${baseURL}/api/topstories/${limit}`, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
    .then(res => res.json())
    .then(stories => dispatch(addStories(stories)))
    .catch(() => {
      dispatch(addStoriesFailed('failed to load stories'));
    });
  };
}

export function visitLink(id) {
  return (dispatch, getState) => {
    const { visited } = getState();
    let ids;
    if (!visited) {
      ids = JSON.stringify([id]);
    } else {
      ids = JSON.stringify([...visited, id]);
    }
    localStorage.setItem('visited', ids);
    dispatch({ type: ActionTypes.VISIT_LINK, id });
  };
}

export function addVisited() {
  const ids = localStorage.getItem('visited');
  if (!ids) {
    return { type: ActionTypes.ADD_VISITED, ids: [] };
  }
  return { type: ActionTypes.ADD_VISITED, ids: JSON.parse(ids) };
}

export function favorite(post) {
  return (dispatch, getState) => {
    const { favorites } = getState();
    let posts;
    if (!favorites) {
      posts = JSON.stringify([post]);
    } else {
      posts = JSON.stringify([...favorites, post]);
    }
    localStorage.setItem('favorites', posts);
    dispatch({ type: ActionTypes.FAVORITE, post });
  };
}

export function unFavorite(id) {
  return (dispatch, getState) => {
    const { favorites } = getState();
    localStorage.setItem('favorites', JSON.stringify(
      favorites.filter(f => f.id !== id)
    ));
    dispatch({ type: ActionTypes.UN_FAVORITE, id });
  };
}

export function addFavorites() {
  const posts = localStorage.getItem('favorites');
  if (!posts) {
    return { type: ActionTypes.ADD_FAVORITES, posts: [] };
  }

  return { type: ActionTypes.ADD_FAVORITES, posts: JSON.parse(posts) };
}
