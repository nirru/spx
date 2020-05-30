import fetch from "isomorphic-fetch";
const limit = 5;
export function fetchCircuits( page = 1) {
    return fetch( `https://hn.algolia.com/api/v1/search?page=${page}&hitsPerPage=${limit}` )
        .then( res => res.json( ) )
        .then( res =>{
            return res;
        }  );
}
