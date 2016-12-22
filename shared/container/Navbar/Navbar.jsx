import React, { Component } from 'react';
import { connect } from 'react-redux';

import SideNavButton from '../../components/SideNavButton/SideNavButton';

class Navbar extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper teal lighten-1">
          <div className="container">
            <a href="/" className="brand-logo">HackerNews Reader</a>
            <SideNavButton />
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="/favorites">Favorites</a></li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li><a href="/favorites">Favorites</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect()(Navbar);