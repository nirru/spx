import {NEXT_PAGE, PREV_PAGE} from "./action.constant";

export const nextPage = ( data ) => ( {
    type: NEXT_PAGE,
    data,
} );

export const prevPage = ( data ) => ( {
    type: PREV_PAGE,
    data,
} );