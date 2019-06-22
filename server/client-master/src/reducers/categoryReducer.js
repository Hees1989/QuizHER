import {categoryConstants} from "../constants/constants";

const categoryReducer = (state = {
    pending: false,
    categories: [],
    error: null
}, action) => {
    switch (action.type) {
        case categoryConstants.CATEGORIES_GET_PENDING:
            return {
                ...state,
                pending: true
            };
        case categoryConstants.CATEGORIES_GET_SUCCESS:
            return {
                ...state,
                pending: false,
                categories: action.payload
            };
        case categoryConstants.CATEGORIES_GET_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default categoryReducer;