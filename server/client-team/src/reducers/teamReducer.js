const teamReducer = (state = {
    _id: "",
    name: ""
}, action) => {
    // eslint-disable-next-line
    switch (action.type) {
        case "TEAM_SET_NAME":
            state = {
                ...state,
                name: action.payload
            };
            break;
    }
    return state;
};

export default teamReducer;