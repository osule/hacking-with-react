import React from 'react';
import { Route } from 'react-router';

import App from './App';
import Detail from './pages/Detail';
import List from './pages/List';

const routes = (
  <App>
    <Route exact path="/" component={List} />
    <Route path="/detail/:repo" component={Detail} />
  </App>
);

export default routes;