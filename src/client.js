import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import Layout from "./components/Layout";
// import {createStore1} from "./store/store";
import "./App.css";
import { PersistGate } from 'redux-persist/integration/react';
import { reduxStore, reduxPersistor } from './store/store';

// const {store,persistor} = createStore1( window.REDUX_DATA );

const jsx = (
    <ReduxProvider store={ reduxStore }>
        <PersistGate loading={null} persistor={reduxPersistor}>
        <Router>
            <Layout />
        </Router>
        </PersistGate>
    </ReduxProvider>
);

const app = document.getElementById( "app" );
ReactDOM.hydrate( jsx, app );
