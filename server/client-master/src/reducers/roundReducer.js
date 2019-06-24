import {roundConstants} from "../constants/constants";

const roundReducer = (state = {
    selectedCategories: []
}, action) => {
    switch (action.type) {
        case roundConstants.ROUND_ADD_CATEGORIES:
            console.log(action.payload);
            return {
                ...state,
                selectedCategories: [
                    ...state.selectedCategories,
                    action.payload
                ]
            };
        case '':

            break;
        default:
            return state;
    }
};

export default roundReducer;