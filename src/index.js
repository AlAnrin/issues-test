import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {issuesReducer} from './issuesReducer';
import Home from './Home';
import {routesReducer} from './routerReducer';

const store = createStore(combineReducers({issues: issuesReducer, routes: routesReducer}), applyMiddleware(thunk, logger));

ReactDOM.render(
    <Provider store={store}>
        <Home/>
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();
