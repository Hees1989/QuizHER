import {questionsConstants} from "../constants/constants";

const questionReducer = (state = {
    questions:[],
    selectedQuestion:''
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
        case questionsConstants.SELECT_QUESTION:
            return {
                ...state,
                selectedQuestion:action.payload
            };
        case questionsConstants.QUESTIONS_REMOVE_QUESTION:
            state.questions.splice(state.selectedQuestion, 1);
            // state.questions.forEach((question) => {
            //     console.log(question);
            //     console.log(state.selectedQuestion);
            //     // if (question.teamName === action.payload.payload.teamName) {
            //     //     question.givenAnswer = action.payload.payload.givenAnswer;
            //     // }
            // });
            return state;
        default:
            return state;
    }
};

export default questionReducer;