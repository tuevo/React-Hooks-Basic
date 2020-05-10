import React from "react";
import PropTypes from "prop-types";
import "./PostList.style.scss";
import * as moment from 'moment';

PostList.propTypes = {
  posts: PropTypes.array,
  isLoading: PropTypes.bool,
};

PostList.defaultProps = {
  posts: [],
  isLoading: false
};

function PostList(props) {
  const { posts, isLoading } = props;
  return (
    <ul className="post-list">
      {posts.map((post, index) => (
        <li key={index} className="post-list__item animated fadeIn" style={{ animationDelay: `${index * 0.2}s` }}>

          <div className="post-list__item__thumbnail">
            <img src={post.imageUrl} alt="thumbnail" />
          </div>

          <div className="post-list__item__details">
            <span className="post-list__item__details__title">{post.title}</span>
            <div>
              <span className="post-list__item__details__posted-time">Posted at {moment(new Date(post.createdAt)).format('HH:mm DD-MM-YYYY')}</span>
              <p className="post-list__item__details__description">{post.description}</p>
            </div>
          </div>

        </li>
      ))}
      {isLoading && (
        <div className="post-list__util--loading">
          <span>Loading...</span>
        </div>
      )}
      {posts.length === 0 && !isLoading && (
        <div className="post-list__util--empty">
          <span>No data</span>
        </div>
      )}
    </ul>
  );
}

export default PostList;
