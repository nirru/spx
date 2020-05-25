import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { fetchCircuits } from "../service/api";
import StateLoader from "../utility/StateLoader";
import { persistStore, persistCombineReducers } from 'redux-persist';
import { CookieStorage } from 'redux-persist-cookie-storage';
import Cookies from 'js-cookie';

export const initializeSession = ( ) => ( {
    type: "INITIALIZE_SESSION",
} );

const storeData = ( data ) => ( {
    type: "STORE_DATA",
    data,
} );
const hideNews = ( data ) => ( {
    type: "HIDE_DATA",
    data,
} );
export const fetchData = ( ) => ( dispatch ) => {
    return fetchCircuits( ).then( res => dispatch( storeData( res ) ) );
}

export const fetchHideData = ( ) => ( dispatch ) => {

    return dispatch(hideNews('1'));
}


export const sessionReducer = ( state = false, action ) => {
    switch ( action.type ) {
        case "INITIALIZE_SESSION":
            return true;
        default: return state;
    }
};

 export const dataReducer = ( state = [ ], action ) => {
    switch ( action.type ) {
        case "STORE_DATA":
            return action.data;
        case "HIDE_DATA":
            console.log(state.hits)
            return {...state,hits:state.hits.splice(1,1)}
        default: return state;
    }
};

// export const reducer = combineReducers( {
//     loggedIn: sessionReducer,
//     data: dataReducer,
// } );

const persistConfig = {
    key: "root",
    storage: new CookieStorage(Cookies/*, options */)
}

 const rootReducer = persistCombineReducers(persistConfig, {
     loggedIn: sessionReducer,
     data: dataReducer,
 })

const stateLoader = new StateLoader();

// export const createStore1 = ( initialState ) => {
//     let store = createStore( rootReducer, initialState, applyMiddleware( thunkMiddleware ) );
//     let persistor = persistStore(store, {});
//     store.subscribe(() => {
//         console.log(store.getState());
//         stateLoader.saveState(store.getState());
//     });
//     return { store,persistor };
// }

export const reduxStore = createStore(rootReducer, applyMiddleware( thunkMiddleware ));
export const reduxPersistor = persistStore(reduxStore, {});



