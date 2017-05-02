import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import createHistory from 'history/createHashHistory';

import App from './App';
import Detail from './pages/Detail';
import List from './pages/List';


ReactDOM.render(
    <Router history={createHistory({ queryKey: false })}
      onUpdate={() => window.scrollTo(0, 0)}>
        <App>
          <Route exact path="/" component={ List } />
          <Route path="/detail/:repo" component={ Detail } />
        </App>
    </Router>,
    document.getElementById('root')
);
