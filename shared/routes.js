import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
import Reader from './container/Reader/Reader';
import Favorites from './container/Favorites/Favorites';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Reader} />
    <Route path="/favorites" component={Favorites} />
  </Route>
);

export default routes;
