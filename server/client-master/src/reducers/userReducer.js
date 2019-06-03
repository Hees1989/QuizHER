const userReducer = (state = {
    name: "Jaimy"
}, action) => {
    // eslint-disable-next-line
    switch (action.type) {
        case "USER_SET_NAME":
            state = {
                ...state,
                name: action.payload
            };
            break;
    }
    return state;
};

export default userReducer;