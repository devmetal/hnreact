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

  render() {
    return (
      <div className="collection with-header">
        <div className="collection-header">
          <span>Stories</span>
          <Refresh show={!this.props.isFetching} onClick={this.refresh} />
        </div>
        {this.props.stories.map((post) => (
          <HackerItem
            post={post}
            key={post.id}
          />
        ))}
        <ShowMore show={!this.props.isFetching} onClick={this.showMore} />
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
