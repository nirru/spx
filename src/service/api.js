import fetch from "isomorphic-fetch";

export function fetchCircuits( ) {
    return fetch( "https://hn.algolia.com/api/v1/search?page=1&hitsPerPage=10" )
        .then( res => res.json( ) )
        .then( res =>{
            return res;
        }  );
}
