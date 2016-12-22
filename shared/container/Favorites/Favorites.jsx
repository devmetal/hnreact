import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import HackerItem from '../../components/Item/Item';
import { createSelector } from 'reselect';

class Favorites extends Component {
  constructor(props, context) {
    super(props, context);

    this.openItem = this.openItem.bind(this);
    this.favorite = this.favorite.bind(this);
  }

  openItem(post) {
    this.props.dispatch(Actions.visitLink(post.id));
    const win = window.open(post.url, '_blank');
    win.focus();
  }

  favorite(post) {
    this.props.dispatch(Actions.unFavorite(post.id));
  }

  componentDidMount() {
    this.props.dispatch(Actions.addFavorites());
    this.props.dispatch(Actions.addVisited());
  }
  
  render() {
    const storiesList = this.props.favorites.map((post) => (
      <HackerItem
        post={post}
        key={post.id}
        clickHandler={this.openItem}
        favoriteHandler={this.favorite}
      />
    ));

    return (
      <div className="container">
        <ul className="collection with-header">
          <li className="collection-header">
            <div className="title">Favorites</div>
          </li>
          {storiesList}
        </ul>
      </div>
    );
  }
}

const favoritesSelector = createSelector(
  [(store) => store.favorites, (store) => store.visited],
  (favorites, visited) => favorites.map(f => ({
    ...f,
    visited: visited.includes(f.id),
    favorite: true,
  }))
);

function mapStateToProps(store) {
  return {
    favorites: favoritesSelector(store),
  };
}

export default connect(mapStateToProps)(Favorites);
