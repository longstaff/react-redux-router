import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import Home from '../home/Home'
import Post from '../post/Post'

export const history = createBrowserHistory();

export class App extends Component {

  render() {
    let loadingPageClass = this.props.loading ? 'app_loading' : 'app_loading app_loading--hidden';

    return (
      <div className ="app">
        <div className={loadingPageClass}/>
        <Router history={history}>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/:id" component={Page} />
          </Switch>
        </Router>
      </div>
    );
  }
}
App.propTypes = {
  loading: PropTypes.bool
}

export const Page = ({ match }) => (
  <Post post={match.params.id}/>
)

/**
 * Redux container
* */

export function mapStateToProps(state) {
  return {
    loading: state.loading
  };
}

export function mapDispatchToProps(dispatch, getState) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);