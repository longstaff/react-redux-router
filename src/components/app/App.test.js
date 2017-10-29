import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { MemoryRouter, Router, Route } from 'react-router';	
import { configure, mount, shallow } from 'enzyme';
import { shallowWithStore } from 'enzyme-redux';
import Adapter from 'enzyme-adapter-react-16';
import {App, history, Page, mapStateToProps, mapDispatchToProps} from './App';
import * as AppActions from './AppActions';
import * as AppReducer from './appReducer';
import Home from '../home/Home';
import Post from '../post/Post';

describe('component', () => {
	function setup() {
		configure({ adapter: new Adapter() });

		const loadingProps = {
			loading: true
		};
		const loadedProps = {
			loading: false
		};
		const store = {
			getState: () => {return {postList: []}}
		}
	  return {
	    loadedProps,
	    loadingProps
	  }
	}

	it('should render self', () => {
    const { loadingProps } = setup();
	  const enzymeWrapper = shallow(<App {...loadingProps} />);

    expect(enzymeWrapper.find('.app').length).toBe(1);
    expect(enzymeWrapper.find(Route).length).toBe(2);

	  const pathMap = enzymeWrapper.find(Route).reduce((pathMap, route) => {
	    const routeProps = route.props();
	    pathMap[routeProps.path] = routeProps.component;
	    return pathMap;
	  }, {});

	  expect(pathMap['/']).toBe(Home);
	  expect(pathMap['/:id']).toBe(Page);
  })

	it('should render home route', () => {
    const { loadedProps } = setup();
    const state = {posts: {}, postList: []};
    const context = {
    	context:{store: { getState: jest.fn().mockReturnValue(state), subscribe: jest.fn(), dispatch: jest.fn() }},
    	contextTypes: {store: PropTypes.object},
    	childContextTypes: {store: PropTypes.object}
    };
	  history.push({pathname: '/'})
	  const enzymeWrapper = mount(<App {...loadedProps} />, context);
    expect(enzymeWrapper.find('.app').length).toBe(1);
    expect(enzymeWrapper.find(Home).length).toBe(1);
  })
	it('should render id route', () => {
    const { loadedProps } = setup();
    const state = {posts: {}, postList: []};
    const context = {
    	context:{store: { getState: jest.fn().mockReturnValue(state), subscribe: jest.fn(), dispatch: jest.fn() }},
    	contextTypes: {store: PropTypes.object},
    	childContextTypes: {store: PropTypes.object}
    };
	  history.push({pathname: '/123'})
	  const enzymeWrapper = mount(<App {...loadedProps} />, context);
    expect(enzymeWrapper.find('.app').length).toBe(1);
    expect(enzymeWrapper.find(Post).length).toBe(1);
    expect(enzymeWrapper.find(Post).prop('post')).toBe('123');
  })

	it('should hide loading page if loading is false', () => {
    const { loadedProps } = setup();
	  const enzymeWrapper = shallow(<App {...loadedProps} />);

    expect(enzymeWrapper.find('.app_loading').length).toBe(1);
    expect(enzymeWrapper.find('.app_loading.app_loading--hidden').length).toBe(1);
    expect(enzymeWrapper.find(Route).length).toBe(2);
  })
	it('should show loading page if loading is true', () => {
    const { loadingProps } = setup();
	  const enzymeWrapper = shallow(<App {...loadingProps} />);

    expect(enzymeWrapper.find('.app_loading').length).toBe(1);
    expect(enzymeWrapper.find('.app_loading.app_loading--hidden').length).toBe(0);
    expect(enzymeWrapper.find(Route).length).toBe(2);
  })
})

describe('container', () => {
  it('should pass loading to props from state', () => {
    const loading = [];
    const state = {
      loading,
      key: 'val'
    }
    expect(mapStateToProps(state)).toEqual({loading});
  })
  it('should be empty object', () => {
    const dispatch = {}
    const getState = {}
    const res = mapDispatchToProps(dispatch, getState);
    expect(res).toEqual({});
  })
})


describe('actions', () => {
  it('should create an action to set loading state', () => {
    const loading = true
    const expectedAction = {
      type: AppActions.LOADING_SET,
      isLoading: loading
    }
    expect(AppActions.setLoading(loading)).toEqual(expectedAction)
  })
})

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(AppReducer.loading(undefined, {})).toEqual(false)
  })
  it('should handle LOADING_SET', () => {
  	expect(
      AppReducer.loading(false, {
        type: AppActions.LOADING_SET,
        isLoading: true
      })
    ).toEqual(true);

  	expect(
      AppReducer.loading(true, {
        type: AppActions.LOADING_SET,
        isLoading: false
      })
    ).toEqual(false)
  })
})