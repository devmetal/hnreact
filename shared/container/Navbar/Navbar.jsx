import React, { Component } from 'react';
import { connect } from 'react-redux';

class Navbar extends Component {
  constructor(props, context) {
    super(props, context);
  }
  
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <div className="container">
            <a href="#" className="brand-logo">HackerNews Reader</a>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect()(Navbar);