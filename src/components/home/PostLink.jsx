import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostList = ({post}) => {
  return (
    <li key={post.id}>
      <Link to={`/${post.id}`}>{post.title}</Link>
    </li>
  )
}
PostList.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string
  })
}

export default PostList