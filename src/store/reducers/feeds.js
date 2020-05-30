import {HIDE_DATA, NEXT_PAGE, PREV_PAGE, STORE_DATA, UP_VOTES} from "../actions/action.constant";

export const dataReducer = ( state = {page:0}, action ) => {
    switch ( action.type ) {
        case STORE_DATA:
            return action.data;
        case HIDE_DATA:
            const updatedList = state.hits.filter(x=>x.objectID !== action.objectID);
            return {...state,hits:updatedList}
        case UP_VOTES:
            const newState = state.hits.map(obj =>
                obj.objectID === action.objectID ? { ...obj, points: obj.points + 1 } : obj
            );
            return {...state,hits:newState}
        case NEXT_PAGE:
            return { ...state,hits:action.data.hits, page: state.page + 1 }
        case PREV_PAGE:
            return { ...state,hits:action.data.hits, page: state.page - 1 }

        default: return state;
    }
};