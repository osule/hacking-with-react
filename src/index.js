import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import createHistory from 'history/createHashHistory';

import routes from './routes';

ReactDOM.render(
    <BrowserRouter history={createHistory({ queryKey: false })}
      onUpdate={() => window.scrollTo(0, 0)}>
      {routes}
    </BrowserRouter>,
    document.getElementById('root')
);
