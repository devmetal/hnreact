import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stories from '../Stories/Stories';
import Navbar from '../Navbar/Navbar';

class Reader extends Component {
  constructor(props, context) {
    super(props, context);
  }
  
  render() {
    return (
      <div>
        <Navbar />
        <Stories />
      </div>
    );
  }
}

export default connect()(Reader);