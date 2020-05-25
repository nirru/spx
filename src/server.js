import express from "express";
import path from "path";

import React from "react";
import serialize from "serialize-javascript";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import {Helmet} from "react-helmet";
import routes from "./routes";
import Layout from "./components/Layout";
import {dataReducer, initializeSession, sessionReducer,} from "./store/store";

import { getStoredState, persistCombineReducers } from 'redux-persist';
import { CookieStorage, NodeCookiesWrapper } from 'redux-persist-cookie-storage';
import Cookies from 'cookies';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from "redux-thunk";

const app = express();

app.use( express.static( path.resolve( __dirname, "../dist" ) ) );
app.use(async (req, res, next) => {

    const cookieJar = new NodeCookiesWrapper(new Cookies(req, res));

    const persistConfig = {
        key: 'root',
        storage: new CookieStorage(cookieJar),
        stateReconciler(inboundState, originalState) {
            return originalState;
        }
    };

    let preloadedState;
    try {
        preloadedState = await getStoredState(persistConfig);
    } catch (e) {
        preloadedState = {};
    }


    const rootReducer = persistCombineReducers(persistConfig, {
        loggedIn: sessionReducer,
        data: dataReducer,
    });

    req.reduxStore = createStore(rootReducer, preloadedState,applyMiddleware( thunkMiddleware ));
    res.removeHeader('Set-Cookie');
    next();
});

app.get( "/*", ( req, res ) => {
    const context = { };
    // const {store} = createStore1( );
   const store = req.reduxStore
    store.dispatch( initializeSession( ) );

    const dataRequirements =
        routes
            .filter( route => matchPath( req.url, route ) ) // filter matching paths
            .map( route => route.component ) // map to components
            .filter( comp => comp.serverFetch ) // check if components have data requirement
            .map( comp => store.dispatch( comp.serverFetch( ) ) ); // dispatch data requirement


    Promise.all( dataRequirements ).then( ( ) => {
        const jsx = (
            <ReduxProvider store={ store }>
                <StaticRouter context={ context } location={ req.url }>
                    <Layout />
                </StaticRouter>
            </ReduxProvider>
        );
        const reactDom = renderToString( jsx );
        const reduxState = store.getState( );
        const helmetData = Helmet.renderStatic( );

        res.writeHead( 200, { "Content-Type": "text/html" } );
        res.end( htmlTemplate( reactDom, reduxState, helmetData ) );
    } );
} );

app.listen( 2048 );

function htmlTemplate( reactDom, reduxState, helmetData ) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            ${ helmetData.title.toString( ) }
            ${ helmetData.meta.toString( ) }
            <title>React SSR</title>
            <link rel="stylesheet" type="text/css" href="./styles.css" />
        </head>
        
        <body>
            <div id="app">${ reactDom }</div>
            <script>
                window.REDUX_DATA = ${ serialize( reduxState, { isJSON: true } ) }
            </script>
            <script src="./app.bundle.js"></script>
        </body>
        </html>
    `;
}
