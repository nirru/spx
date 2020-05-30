import {HIDE_DATA, INITIALIZE_SESSION, STORE_DATA, UP_VOTES} from "./action.constant";

export const initializeSession = ( ) => ( {
    type: INITIALIZE_SESSION,
} );

export const storeData = ( data ) => ( {
    type: STORE_DATA,
    data,
} );
export const hideNews = ( id ) => ( {
    type: HIDE_DATA,
    objectID:id,
} );

export const increaseVoteCount = ( id ) => ( {
    type: UP_VOTES,
    objectID:id,
} );