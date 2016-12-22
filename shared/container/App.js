import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Navbar from './Navbar/Navbar';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Navbar />
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default connect()(App);
