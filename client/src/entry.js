import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import 'babel-polyfill';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './state/root-epic';

const epicMiddleware = createEpicMiddleware(rootEpic);
import { composeWithDevTools } from 'redux-devtools-extension';

import GamePage from 'src/pages/game';
import reducer from 'src/state/root-reducer';

const middleware = [thunk, epicMiddleware];
const composeEnhancers = composeWithDevTools({ maxAge: 200 }) || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

ReactDOM.render(
  <Provider store={store}>
    <GamePage />
  </Provider>,
  document.getElementById('anchor')
);
