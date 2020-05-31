import fetch from "isomorphic-fetch";
const limit = 50;

/**
 *
 * @param page
 * @returns {Promise<void> | Promise<T | void>}
 */
export function fetchFeeds( page = 1) {
    return fetch( `https://hn.algolia.com/api/v1/search?page=${page}&hitsPerPage=${limit}` )
        .then( res => res.json( ) )
        .then( res => res)
        .catch(error => console.log(error))
}
