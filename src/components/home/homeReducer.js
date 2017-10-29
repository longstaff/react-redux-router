import { combineReducers } from 'redux';
import { POST_LIST_SET } from './HomeActions';

export function postList(state = [], action) {
  switch (action.type) {
    case POST_LIST_SET:
      return action.posts;
    default:
      return state;
  }
}

export default combineReducers({
  postList
});