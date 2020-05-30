import {nextPage, prevPage} from "../store/actions/pageAction";
import {fetchCircuits} from "./api";

export const dispatchNextPage = ( page) => ( dispatch ) => {
    return fetchCircuits(page ).then( res => dispatch( nextPage( res ) ) ) ;
}

export const dispatchPrevPage = ( page) => ( dispatch ) => {
    return fetchCircuits(page ).then( res => dispatch( prevPage( res ) ) ) ;
}

