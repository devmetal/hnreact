import React, { PropTypes } from 'react';

function ShowMore(props) {
  const cls = `collection-item ${props.show ? '' : 'hidden'}`;
  return (
    <li onClick={props.onClick} className={cls} >
      Show more
    </li>
  );
}

ShowMore.propTypes = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ShowMore;
