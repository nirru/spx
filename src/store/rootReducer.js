import { combineReducers } from 'redux';
import {withPagination} from '../hoc/withPagination'
import {dataReducer, sessionReducer} from "./reducers";

export const rootReducer = combineReducers({
    data: withPagination(dataReducer),
    sessionReducer:sessionReducer
});