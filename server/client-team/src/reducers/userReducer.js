const userReducer = (state = {
    name: "",
    answer:""
}, action) => {
    // eslint-disable-next-line
    switch (action.type) {
        case "USER_SET_NAME":
            state = {
                ...state,
                name: action.payload
            };
            break;
        case "USER_SET_ANSWER":
            state = {
                ...state,
                answer: action.payload
            };
            break;
    }
    return state;
};

export default userReducer;