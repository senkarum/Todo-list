import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import './assets/css/index.sass';
import App from './App';
import * as serviceWorker from './serviceWorker';


import AppStore from './stores/appStore';
import {Provider} from "mobx-react";

const store = new AppStore();

ReactDOM.render(
    <Router>
        <React.StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
        </React.StrictMode>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
