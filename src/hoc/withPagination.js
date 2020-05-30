export const withPagination = reducer => (state, action) => {
    switch(action.type) {
        case 'GO_NEXT_PAGE':
            return { ...state, page: state.page + 1 }
        // ...
        default:
            return reducer(state, action);
    }
};