/**
 * Created by zhuo on 16/3/23.
 */
"use strict";
import React from "react";
import ReactDom from "react-dom";
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux';
import reducsers from './reducers';

import App from "./components/App.jsx";
import List from "./components/List.jsx";
import Message from "./components/Message.jsx";
import About from "./components/About.jsx";
import Login from "./components/Login.jsx";
import Topic from "./components/Topic.jsx";
import './styles/commonPage.scss';

const store = createStore(
    combineReducers(Object.assign({}, reducsers, {routing: routerReducer})),
    applyMiddleware(thunk, routerMiddleware(hashHistory))
);
store.subscribe(() =>
    console.log("状态改变", store.getState())
)

const history = syncHistoryWithStore(hashHistory, store);

ReactDom.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={List}/>
                <Route path="all" component={List}/>
                <Route path="good" component={List}/>
                <Route path="share" component={List}/>
                <Route path="ask" component={List}/>
                <Route path="job" component={List}/>
                <Route path="message" component={Message}/>
                <Route path="about" component={About}/>
                <Route path="login" component={Login}/>
                <Route path="topic/:topicId" component={Topic}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("react-mount"));

