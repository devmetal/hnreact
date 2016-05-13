import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import HackerItem from '../../components/Item/Item';
import ShowMore from '../../components/ShowMore/ShowMore';
import Refresh from '../../components/Refresh/Refresh';

class Stories extends Component {
  constructor(props, context) {
    super(props, context);
    this.showMore = this.showMore.bind(this);
    this.refresh = this.refresh.bind(this);
    this.openItem = this.openItem.bind(this);
  }

  componentDidMount() {
    if (!this.props.stories.length) {
      this.props.dispatch(Actions.fetchStories());
    }
  }

  showMore(e) {
    e.preventDefault();
    this.props.dispatch(Actions.incraseLimit());
    this.props.dispatch(Actions.fetchStories());
  }

  refresh(e) {
    e.preventDefault();
    this.props.dispatch(Actions.fetchStories());
  }
  
  openItem(post) {
    const win = window.open(post.url, '_blank');
    win.focus();
  }

  render() {
    return (
      <div className="container">
        <ul className="collection with-header">
          <li className="collection-header">
            <div className="title">Stories
            <Refresh show={!this.props.isFetching} onClick={this.refresh} />
            </div>
          </li>
          {this.props.stories.map((post) => (
            <HackerItem
              post={post}
              key={post.id}
              clickHandler={this.openItem.bind(this, post)}
            />
          ))}
          <ShowMore show={!this.props.isFetching} onClick={this.showMore} />
        </ul>
      </div>
    );
  }
}

Stories.propTypes = {
  stories: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
};

Stories.need = [() => { return Actions.fetchStories(); }];

function mapStateToProps(store) {
  return {
    stories: store.stories,
    isFetching: store.isFetching,
  };
}

export default connect(mapStateToProps)(Stories);
