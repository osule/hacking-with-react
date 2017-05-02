import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import createHistory from 'history/createHashHistory';

import Detail from './pages/Detail';
import List from './pages/List';


ReactDOM.render(
    <Router history={createHistory({ queryKey: false })}
      onUpdate={() => window.scrollTo(0, 0)}>
        <Switch>
          <Route exact path='/' component={ List } />
          <Route path="/detail/:repo" component={ Detail } />
        </Switch>
    </Router>,
    document.getElementById('root')
);
