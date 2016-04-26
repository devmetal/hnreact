import React, { PropTypes } from 'react';

function ShowMore(props) {
  const cls = `collection-item ${props.show ? '' : 'hidden'}`;
  return (
    <a href="#" onClick={props.onClick} className={cls} >
      Show more
    </a>
  );
}

ShowMore.propTypes = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ShowMore;
