import {INITIALIZE_SESSION} from "../actions/action.constant";

export const sessionReducer = ( state = false, action ) => {
    switch ( action.type ) {
        case INITIALIZE_SESSION:
            return true;
        default: return state;
    }
};