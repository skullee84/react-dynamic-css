import 'babel-polyfill';

import React    from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';

import App from './components/App.jsx';
import A   from './components/main/A.jsx';
import B   from './components/main/B.jsx';

var routes = {
  path: '/',
  component: App,
  indexRoute: { component: A },
  childRoutes : [
    { path: '/a', component: A },
    { path: '/b', component: B }
  ]
};

ReactDOM.render(
  <Router history={hashHistory} routes={routes}>
  </Router>,
  document.getElementById('dominicApp')
);
