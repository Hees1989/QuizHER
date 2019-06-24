const answerReducer = (state = {
    answer: []
}, action) => {
    switch (action.type) {
        case 'ANSWER_SENT':
            state = {
                ...state,
                answer: action.payload
            };
            break;
        default:

            break;
    }
    return state;
};

export default answerReducer;