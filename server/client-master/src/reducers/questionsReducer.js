import {questionsConstants} from "../constants/constants";

const questionReducer = (state = {
    questions:[]
}, action) => {
    switch (action.type) {
        case questionsConstants.QUESTIONS_GET_PENDING:
            return {
                ...state,
                pending: true
            };
        case questionsConstants.QUESTIONS_GET_SUCCESS:
            return {
                ...state,
                pending: false,
                questions: action.payload
            };
        case questionsConstants.QUESTIONS_GET_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default questionReducer;