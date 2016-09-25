import React, {Component} from 'react';
import {Route, Router, hashHistory} from 'react-router';
import ReactDOM from 'react-dom';
import Root from './root';
import GameBoard from './game-board/components/game-board';

let Routes = <Router history={hashHistory}>
            <Route path="/" component={GameBoard}>
                <Route path="gameboard" component={GameBoard}/>
            </Route>
        </Router>;


ReactDOM.render(Routes, document.getElementById('app'));