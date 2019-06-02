const questionReducer = (state = {
    question:''
}, action) => {

    switch(action.type) {
        case "QUESTION_RECEIVED":
            return state = action.payload;

        case "QUESTION_CLOSED":
            return state = action.payload;
    }
    return state;
}

export default questionReducer;