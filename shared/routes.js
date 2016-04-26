import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
import Stories from './container/Stories/Stories';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Stories} />
  </Route>
);

export default routes;
