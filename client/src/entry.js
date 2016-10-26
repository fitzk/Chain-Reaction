import React, {Component} from 'react';
import {Route, Router, browserHistory} from 'react-router';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, compose} from 'redux';
import {Provider} from 'react-redux';
import Matrix from 'matrix/containers/matrix.js';
import thunk from 'redux-thunk';
import reducer from 'matrix/reducers.js';
import "babel-polyfill";

let middleware = [thunk];
let store = createStore(reducer, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));

let Routes = (<Provider store={store}>
                <Router history={browserHistory}>
                        <Route path="/" component={Matrix}>
                            <Route path="play" component={Matrix}/>
                        </Route>
                    </Router>
            </Provider>);


ReactDOM.render(Routes, document.getElementById('app'));
