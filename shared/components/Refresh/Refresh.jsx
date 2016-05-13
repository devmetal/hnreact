import React, { PropTypes } from 'react';

function Refresh(props) {
  const cls = `secondary-content btn-floating waves-effect waves-light right ${props.show ? '' : 'disabled'}`;
  return (
    <a className={cls} onClick={props.onClick}>
      <i className="material-icons">update</i>
    </a>
  );
}

Refresh.propTypes = {
  show: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Refresh;
