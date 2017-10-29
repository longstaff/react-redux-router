import { setLoading } from '../app/AppActions';
require('isomorphic-fetch');

export const POST_SET = "concrete.test.posts.set";

export function setPost(id, post) {
	return {
		type: POST_SET,
		id,
		post
	}
}
export function setPostError(id) {
	return {
		type: POST_SET,
		id,
		post: null
	}
}

/***
Thunks
****/

export function getPostIfNeeded(id) {
	return (dispatch, getState) => {
		if(!getState().posts[id]) {
			dispatch(setLoading(true));
			return fetch(`http://jsonplaceholder.typicode.com/posts/${id}`).then((resp) => {
				return resp.json().then((post) => {
					dispatch(setPost(id, post));
					dispatch(setLoading(false));
				}, (err) => {
					console.error("PARSING JSON FAILED", err);
					dispatch(setPostError(id));
					dispatch(setLoading(false));
				})
			}, (err) => {
				console.error("FETCHING POSTS FAILED", err);
				dispatch(setPostError(id));
				dispatch(setLoading(false));
			})
		}
	}
}