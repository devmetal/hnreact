import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
import Reader from './container/Reader/Reader';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Reader} />
  </Route>
);

export default routes;
