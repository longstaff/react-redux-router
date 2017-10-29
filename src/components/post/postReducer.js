import { combineReducers } from 'redux';
import { POST_SET } from './PostActions';

export function posts(state = {}, action) {
  switch (action.type) {
    case POST_SET:
      return Object.assign({}, state, {
        [action.id]: action.post
      });
    default:
      return state;
  }
}

export default combineReducers({
  posts
});