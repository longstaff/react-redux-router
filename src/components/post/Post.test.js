import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter } from 'react-router';
import { createMockStore } from 'redux-test-utils';
import { shallowWithStore } from 'enzyme-redux';
import { configure, mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PostContainer, { Post, mapStateToProps, mapDispatchToProps } from './Post';
import * as PostActions from './PostActions';
import * as PostReducer from './postReducer';
import * as AppActions from '../app/AppActions';
var fetchMock = require('fetch-mock');

configure({ adapter: new Adapter() });

describe('component', () => {
  function setup() {
    const props = {
      posts: {
        nullPost: null,
        loadedPost: {title: "title", body: "body"}
      },
      getPostIfNeeded: jest.fn(),
      post: 'undefinedId'
    };

    return {
      props
    }
  }

  it('should render title as loading if no post', () => {
    const { props } = setup();
    const enzymeWrapper = shallow(<Post {...props}/>);

    expect(enzymeWrapper.find('h1').length).toBe(1);
    expect(enzymeWrapper.find('h1').text()).toBe("Loading");
    expect(enzymeWrapper.find('p').length).toBe(0);
  })
  it('should render title as Error post is null', () => {
    const { props } = setup();
    props.post = "nullPost";
    const enzymeWrapper = shallow(<Post {...props}/>);

    expect(enzymeWrapper.find('h1').length).toBe(1);
    expect(enzymeWrapper.find('h1').text()).toBe("Error loading page");
    expect(enzymeWrapper.find('p').length).toBe(1);
    expect(enzymeWrapper.find('p').text()).toBe("Please check your URL or try again later");
  })
  it('should render post if loaded', () => {
    const { props } = setup();
    props.post = "loadedPost";
    const enzymeWrapper = shallow(<Post {...props}/>);

    expect(enzymeWrapper.find('h1').length).toBe(1);
    expect(enzymeWrapper.find('h1').text()).toBe(props.posts.loadedPost.title);
    expect(enzymeWrapper.find('p').length).toBe(1);
    expect(enzymeWrapper.find('p').text()).toBe(props.posts.loadedPost.body);
  })

  it('should call getPostIfNeeded on mount', () => {
    const { props } = setup();
    const enzymeWrapper = mount(<MemoryRouter><Post {...props}/></MemoryRouter>);
    expect(props.getPostIfNeeded.mock.calls.length).toBe(1);
    expect(props.getPostIfNeeded.mock.calls[0][0]).toBe(props.post);
  })
})

describe('container', () => {
  it('should pass posts to props from state', () => {
    const posts = [];
    const state = {
      posts,
      key: 'val'
    }
    expect(mapStateToProps(state)).toEqual({posts});
  })
  it('should pass posts to props from state', () => {
    const dispatch = {}
    const getState = {}
    const res = mapDispatchToProps(dispatch, getState);
    expect(typeof res.getPostIfNeeded).toBe('function');
  })
})

describe('actions', () => {
  it('should create an action to set post', () => {
    const post = {};
    const id = 'id';
    const expectedAction = {
      type: PostActions.POST_SET,
      post: post,
      id
    }
    expect(PostActions.setPost(id, post)).toEqual(expectedAction)
  })
  it('should create an action to set post as error', () => {
    const id = '';
    const expectedAction = {
      type: PostActions.POST_SET,
      post: null,
      id
    }
    expect(PostActions.setPostError(id)).toEqual(expectedAction)
  })

  /**
   * This should also mock results from fetch and test the resonse, however I cant make fetch-mock work at the moment.
   */
  it('should create an action to check and fetch post', () => {
    const getState = jest.fn().mockReturnValue({posts: []});
    const dispatch = jest.fn();
    const id = "id";
    AppActions.setLoading = jest.fn();

    expect(typeof PostActions.getPostIfNeeded()).toBe('function');

    return PostActions.getPostIfNeeded(id)(dispatch, getState).then(() => {
      expect(getState.mock.calls.length).toBe(1);
      expect(dispatch.mock.calls.length).toBe(3);
      expect(AppActions.setLoading.mock.calls.length).toBe(2);
      expect(AppActions.setLoading.mock.calls[0][0]).toBe(true);
      expect(AppActions.setLoading.mock.calls[0][0]).toBe(true);
      expect(AppActions.setLoading.mock.calls[1][0]).toBe(false);
      expect(AppActions.setLoading.mock.calls[1][0]).toBe(false);
    })
  })
})

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(PostReducer.posts(undefined, {})).toEqual({})
  })
  it('should handle POST_LIST_SET', () => {
    const post = []
  	expect(
      PostReducer.posts({otherId: {}}, {
        type: PostActions.POST_SET,
        post,
        id: "id"
      })
    ).toEqual({
      id: post,
      otherId: {}
    });
  })
})
