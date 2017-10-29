import 'isomorphic-fetch';
import { setLoading } from '../app/AppActions';
export const POST_LIST_SET = "concrete.test.postlist.set";

export function setPostList(posts) {
	return {
		type: POST_LIST_SET,
		posts
	}
}

/***
Thunks
****/

export function getPostListIfNeeded() {
	return (dispatch, getState) => {
		if(!getState().posts.length) {
			dispatch(setLoading(true));
			return fetch('http://jsonplaceholder.typicode.com/posts').then((resp) => {
				return resp.json().then((postList) => {
					dispatch(setPostList(postList));
					dispatch(setLoading(false));
				}, (err) => {
					console.error("PARSING JSON FAILED", err);
					dispatch(setPostList([]));
					dispatch(setLoading(false));
				})
			}, (err) => {
				console.error("FETCHING POSTS FAILED", err);
				dispatch(setPostList([]));
				dispatch(setLoading(false));
			}).catch((err) => {
				console.error("FETCHING POSTS FAILED", err);
				dispatch(setPostList([]));
				dispatch(setLoading(false));
			})
		}
	}
}