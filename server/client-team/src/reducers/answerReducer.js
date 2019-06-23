const answerReducer = (state = {
    question: '',
    newAnswer: '',
    sent: false
}, action) => {
    switch (action.type) {
        case "APPLY_ANSWER":
            state = {
                ...state,
                newAnswer: action.payload
            };
            break;
        case "APPLIED_ANSWER":
            state = {
                ...state,
                sent: true,
            };
            break;
        case "CHANGE_ANSWER":
            state = {
                ...state,
                newAnswer: action.payload

            };
            break;
        case "RESET_ANSWER":
            state = {
                ...state,
                newAnswer: '',
                sent: false
            };
            break;
        case "SET_QUESTION":
            state = {
                ...state,
                newAnswer: '',
                sent: false,
                question: ''
            };
            break;
    }
    return state;
};

export default answerReducer;