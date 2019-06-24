import {roundConstants} from '../constants/constants';

export function addCategories(categories) {
    return {
        type: roundConstants.ROUND_ADD_CATEGORIES,
        payload: categories
    }
}