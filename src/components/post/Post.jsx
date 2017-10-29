import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPostIfNeeded } from './PostActions';
import { Link } from 'react-router-dom';

export class Post extends Component {

  componentDidMount() {
    this.props.getPostIfNeeded(this.props.post);
  }

  render() {
    let post = this.props.posts[this.props.post];
    let postTitle;
    let postBody;

    if (post === undefined) {
      postTitle = <h1>Loading</h1>;
      postBody = '';
    } else if (post === null) {
      postTitle = <h1>Error loading page</h1>;
      postBody = <p>Please check your URL or try again later</p>;
    } else {
      postTitle = <h1>{post.title}</h1>;
      postBody = <p>{post.body}</p>;
    }

    return (
      <div>
        <Link to={`/`}>Back</Link>
        {postTitle}
        {postBody}
      </div>
    );
  }
}
Post.propTypes = {
  posts: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      body: PropTypes.string
    })
  ),
  getPostIfNeeded: PropTypes.func
}

/**
 * Redux container
* */

export function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

export function mapDispatchToProps(dispatch, getState) {
  return bindActionCreators({
    getPostIfNeeded
  }, dispatch, getState);
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);