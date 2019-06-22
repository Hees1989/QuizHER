import {categoryConstants} from '../constants/constants';

export function getCategoriesPending() {
    return {
        type: categoryConstants.CATEGORIES_GET_PENDING
    }
}

export function getCategoriesSuccess(categories) {
    return {
        type: categoryConstants.CATEGORIES_GET_SUCCESS,
        categories: categories
    }
}

export function getCategoriesError(error) {
    return {
        type: categoryConstants.CATEGORIES_GET_ERROR,
        error: error
    }
}