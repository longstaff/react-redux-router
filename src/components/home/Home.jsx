import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPostListIfNeeded } from './HomeActions';
import PostLink from './PostLink';
import './Home.css';

export class Home extends Component {

  componentDidMount() {
    this.props.getPostListIfNeeded()
  }

  render() {
    return (
      <div className="home">
        <h1 className="home_header">Post List</h1>
        <ul>
          {this.props.postList.map((post) => <PostLink key={post.id} post={post} />)}
        </ul>
      </div>
    );
  }
}
Home.propTypes = {
  id: PropTypes.string,
  postList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      body: PropTypes.string
    })
  ),
  getPostListIfNeeded: PropTypes.func
}

/**
 * Redux container
* */

export function mapStateToProps(state) {
  return {
    postList: state.postList
  };
}

export function mapDispatchToProps(dispatch, getState) {
  return bindActionCreators({
    getPostListIfNeeded
  }, dispatch, getState);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);