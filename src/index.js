import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {issuesReducer} from "./issuesReducer";
import Home from "./Home";

const store = createStore(issuesReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
    <Provider store={store}>
        <Home/>
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();
