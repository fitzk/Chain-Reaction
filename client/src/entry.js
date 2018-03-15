import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, browserHistory } from 'react-router';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import 'babel-polyfill';

import GamePage from 'src/pages/game';
import reducer from 'src/state/root-reducer';

const middleware = [thunk];
const store = createStore(
  reducer,
  compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={GamePage}>
        <Route path="play" component={GamePage} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(Routes, document.getElementById('app'));
