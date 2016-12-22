import React, { PropTypes, Component } from 'react';

class Item extends Component {
  constructor(context, props) {
    super(context, props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    return this.props.clickHandler(this.props.post);
  }

  render() {
    let cls = 'collection-item';

    if (this.props.post.visited === true) {
      cls += ' visited';
    }

    return (
      <li className={cls} onClick={this.onClick}>
        <span className="title">{this.props.post.title}</span>
        <p>
          <span>Score: {this.props.post.score}</span>
          <span>By: {this.props.post.by}</span>
        </p>
      </li>
    );
  }
}

Item.propTypes = {
  post: PropTypes.object.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default Item;
