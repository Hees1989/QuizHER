const teamReducer = (state = {
    _id: "",
    name: "",
    applied: false,
    text: ''
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
                applied: action.payload,
                text: ''
            };
            break;
        case "TEAM_DECLINED":
            state = {
                ...state,
                applied: action.payload,
                text: 'Your teamname is inappropiate. Please use a nice teamname'
            };
            break;
    }
    return state;
};

export default teamReducer;