import * as ActionTypes from '../constants/constants';

const initialState = {
  stories: [],
  isFetching: false,
  limit: 50,
  error: '',
};

const favorites = (favs, action) => {
  switch (action.type) {
    case ActionTypes.FAVORITE:
      return [...favs, action.post];
    case ActionTypes.UN_FAVORITE:
      return favs.filter(f => f.id !== action.id);
    default:
      return favs;
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.INCRASE_LIMIT: return {
      ...state,
      limit: state.limit + action.by,
    };
    case ActionTypes.ADD_STORIES: return {
      ...state,
      stories: action.stories,
      isFetching: action.isFetching,
    };
    case ActionTypes.ADD_STORIES_REQUEST: return {
      ...state,
      isFetching: action.isFetching,
    };
    case ActionTypes.ADD_STORIES_FAILED: return {
      ...state,
      isFetching: action.isFetching,
      error: action.error,
    };
    case ActionTypes.ADD_VISITED: return {
      ...state,
      visited: action.ids,
    };
    case ActionTypes.VISIT_LINK: return {
      ...state,
      visited: [...state.visited, action.id],
    };
    case ActionTypes.ADD_FAVORITES: return {
      ...state,
      favorites: action.posts,
    };
    case ActionTypes.FAVORITE:
    case ActionTypes.UN_FAVORITE: return {
      ...state,
      favorites: favorites(state.favorites, action),
    };
    default:
      return state;
  }
};

export default reducer;
