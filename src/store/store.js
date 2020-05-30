import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import StateLoader from "../utility/StateLoader";
import {rootReducer} from "./rootReducer";


const stateLoader = new StateLoader();

export const createStore1 = ( initialState ) => {
    let store = createStore( rootReducer, stateLoader.loadState(initialState), applyMiddleware( thunkMiddleware ) );
    store.subscribe(() => {
        stateLoader.saveState(store.getState());
    });
    return { store:store };
}

export const createStore2 = ( initialState ) => {
    let store = createStore( rootReducer, initialState, applyMiddleware( thunkMiddleware ) );
    return { store };
}



