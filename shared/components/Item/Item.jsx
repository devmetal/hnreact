import React, { PropTypes } from 'react';

function Item(props) {
  const cls = 'collection-item';

  return (
    <a className={cls} target="_blank" href={props.post.url}>
      {props.post.title}
      <span className="badge">{props.post.score}</span>
    </a>
  );
}

Item.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Item;
