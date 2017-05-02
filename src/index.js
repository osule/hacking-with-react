import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import createHistory from 'history/createHashHistory';

import routes from './routes';

ReactDOM.render(
    <Router history={createHistory({ queryKey: false })}
      onUpdate={() => window.scrollTo(0, 0)}>
      {routes}
    </Router>,
    document.getElementById('root')
);
