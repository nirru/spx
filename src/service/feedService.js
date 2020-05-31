import {fetchFeeds} from "./api";
import {hideNews, increaseVoteCount, storeData} from "../store/actions/feedAction";

/**
 * service to get the feeds
 */
export const fetchData = ( ) => ( dispatch ) => {
    return fetchFeeds( ).then( res => dispatch( storeData( res ) ) );
}
/**
 * @param {number} id
 */
export const fetchHideData = ( id ) => ( dispatch ) => {
    return dispatch(hideNews(id));
}

/**
 * @param {number} id
 * in case, If upvote is managed by API, just call the
 * API and on success call the dispatch(increaseVoteCount(id)) method
 */

export const dispatchVoteAction = (id) => (dispatch) => {
    return dispatch(increaseVoteCount(id))
}