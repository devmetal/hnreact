import React, { PropTypes } from 'react';

function Item(props) {
  const cls = 'collection-item';

  return (
    <li className={cls} onClick={props.clickHandler}>
      <span className="title">{props.post.title}</span>
      <p>
        <span>Score: {props.post.score}</span>
        <span>By: {props.post.by}</span>
      </p>
    </li>
  );
}

Item.propTypes = {
  post: PropTypes.object.isRequired,
  clickHandler: PropTypes.func.isRequired
};

export default Item;
