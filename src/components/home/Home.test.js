import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { shallowWithStore } from 'enzyme-redux';
import { configure, mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomeContainer, { Home, mapStateToProps, mapDispatchToProps } from './Home';
import * as HomeActions from './HomeActions';
import * as AppActions from '../app/AppActions';
import * as HomeReducer from './homeReducer';
import PostLink from './PostLink';

configure({ adapter: new Adapter() });

describe('component', () => {
  function setup() {

    const props = {
      postList: [],
      getPostListIfNeeded: jest.fn()
    };

    return {
      props
    }
  }

  it('should render title and empty array if no list', () => {
    const { props } = setup();
    const enzymeWrapper = shallow(<Home {...props}/>);

    expect(enzymeWrapper.find('h1').length).toBe(1);
    expect(enzymeWrapper.find('ul').length).toBe(1);
    expect(enzymeWrapper.find(PostLink).length).toBe(0);
  })
  it('should render title and array of PostLink from postList', () => {
    const { props } = setup();
    props.postList = [{id:1}, {id:2}];
    const enzymeWrapper = shallow(<Home {...props}/>);

    expect(enzymeWrapper.find('h1').length).toBe(1);
    expect(enzymeWrapper.find('ul').length).toBe(1);
    expect(enzymeWrapper.find(PostLink).length).toBe(2);
  })
  it('should call getPostListIfNeeded on mount', () => {
    const { props } = setup();
    const enzymeWrapper = mount(<Home {...props}/>);
    expect(props.getPostListIfNeeded.mock.calls.length).toBe(1);
  })
})

describe('container', () => {
  it('should pass postList to props from state', () => {
    const postList = [];
    const state = {
      postList,
      key: 'val'
    }
    expect(mapStateToProps(state)).toEqual({postList});
  })
  it('should pass postList to props from state', () => {
    const dispatch = {}
    const getState = {}
    const res = mapDispatchToProps(dispatch, getState);
    expect(typeof res.getPostListIfNeeded).toBe('function');
  })
})

describe('actions', () => {
  it('should create an action to set posts', () => {
    const posts = []
    const expectedAction = {
      type: HomeActions.POST_LIST_SET,
      posts
    }
    expect(HomeActions.setPostList(posts)).toEqual(expectedAction)
  })

  /**
   * This should also mock results from fetch and test the resonse, however I cant make fetch-mock work at the moment.
   */
  it('should create an action to check and fetch post list', () => {
    const getState = jest.fn().mockReturnValue({posts: []});
    const dispatch = jest.fn();
    AppActions.setLoading = jest.fn();

    expect(typeof HomeActions.getPostListIfNeeded()).toBe('function');

    return HomeActions.getPostListIfNeeded()(dispatch, getState).then(() => {
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
    expect(HomeReducer.postList(undefined, {})).toEqual([])
  })
  it('should handle POST_LIST_SET', () => {
    const posts = []
  	expect(
      HomeReducer.postList(false, {
        type: HomeActions.POST_LIST_SET,
        posts
      })
    ).toEqual(posts);
  })
})