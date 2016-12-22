import React, { PropTypes, Component } from 'react';

class Item extends Component {
  constructor(context, props) {
    super(context, props);
    this.onClick = this.onClick.bind(this);
    this.onFavorite = this.onFavorite.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { post } = this.props;
    const npost = nextProps.post;

    if (!npost) return true;
    if (!post) return true;

    const should = post.score != npost.score ||
      post.favorite != npost.favorite ||
      post.visited != npost.visited;

    return should;
  }

  onClick() {
    return this.props.clickHandler(this.props.post);
  }

  onFavorite(e) {
    e.stopPropagation();
    return this.props.favoriteHandler(this.props.post);
  }

  render() {
    let cls = 'collection-item';
    const icls = 'material-icons small right';

    if (this.props.post.visited === true) {
      cls += ' visited';
    }

    if (this.props.post.favorite === true) {
      cls += ' favorite';
    }

    return (
      <li className={cls} onClick={this.onClick}>
        <span className="title">{this.props.post.title}</span>
        <i className={icls} onClick={this.onFavorite}>star</i>
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
