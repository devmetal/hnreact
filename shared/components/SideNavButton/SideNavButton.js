import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

export default class SideNavButton extends Component {
  render() {
    return (<a href="#" data-activates="mobile-demo" className="button-collapse">
      <i className="material-icons">menu</i>
    </a>)
  }

  componentDidMount() {
    const node = findDOMNode(this);
    $(node).sideNav();
  }
}
