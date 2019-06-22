const teamReducer = (state = {
    _id: "",
    name: "",
    applied:false
}, action) => {
    // eslint-disable-next-line
    switch (action.type) {
        case "TEAM_SET_NAME":
            state = {
                ...state,
                name: action.payload
            };
            break;
        case "TEAM_APPLIED":
            state = {
                ...state,
                applied: action.payload
            };
            break;
    }
    return state;
};

export default teamReducer;