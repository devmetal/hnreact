import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stories from '../Stories/Stories';
import * as Actions from '../../redux/actions/actions.js';

class Reader extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Stories />
      </div>
    );
  }
}

Reader.need = [() => { return Actions.fetchStories(); }];

export default connect()(Reader);
