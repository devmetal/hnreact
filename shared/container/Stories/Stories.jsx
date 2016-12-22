import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/actions';
import HackerItem from '../../components/Item/Item';
import ShowMore from '../../components/ShowMore/ShowMore';
import Refresh from '../../components/Refresh/Refresh';
import { createSelector } from 'reselect';

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

    this.props.dispatch(Actions.addVisited());
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
    this.props.dispatch(Actions.visitLink(post.id));
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
              clickHandler={this.openItem}
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

const stories = store => store.stories;
const visited = store => store.visited;

const storiesSelector = createSelector(
  [stories, visited],
  (stories, visited) => {
    return stories.map((story) => {
      if (visited.includes(story.id)) {
        return {...story, visited: true};
      } else {
        return story;
      }
    });
  }
)

function mapStateToProps(store) {
  return {
    stories: storiesSelector(store),
    isFetching: store.isFetching,
  };
}

export default connect(mapStateToProps)(Stories);
