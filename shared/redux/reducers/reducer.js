import * as ActionTypes from '../constants/constants';

const initialState = {
  stories: [],
  isFetching: false,
  limit: 50,
  error: '',
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
    default:
      return state;
  }
};

export default reducer;
