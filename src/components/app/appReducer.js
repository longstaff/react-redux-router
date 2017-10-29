import { combineReducers } from 'redux';
import { LOADING_SET } from './AppActions';
import { postList } from '../home/homeReducer'
import { posts } from '../post/postReducer'

export function loading(state = false, action) {
  switch (action.type) {
    case LOADING_SET:
      return action.isLoading;
    default:
      return state;
  }
}

export default combineReducers({
  loading,
  postList,
  posts
});