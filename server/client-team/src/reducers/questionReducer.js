const questionReducer = (state = {
    question: null
}, action) => {

    switch (action.type) {
        case "QUESTION_RECEIVED":
            state = {
                ...state,
                question: action.payload
            };
            break;
        case "QUESTION_CLOSED":
            state = {...state,question:action.payload};
    }
    return state;
}

export default questionReducer;