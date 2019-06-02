const answerReducer = (state = {
                           newAnswer: '',
                           currentAnswer: '',
                           sent: false
                       },
                       action) => {
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
                sent: action.payload,
                currentAnswer: state.newAnswer
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
                currentAnswer: '',
                sent: false
            };
            break;
    }
    return state;
}

export default answerReducer;