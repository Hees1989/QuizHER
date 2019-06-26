import {teamConstants} from '../constants/constants';

const teamReducer = (state = {
    _id: "",
    name: "",
    applied: false,
    sent: false,
    text: '',
    currentQuestion: '',
    givenAnswer: '',
    points:0

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
        case teamConstants.TEAM_CURRENT_QUESTION:
            return {
                ...state,
                currentQuestion: action.payload
            };
        case teamConstants.TEAM_GIVEN_ANSWER:
            return {
                ...state,
                givenAnswer: action.payload
            };
        case teamConstants.TEAM_INCREASE_SCORE:
            return {
                ...state,
                points: this.state.points + action.payload
            };
    }
    return state;
};

export default teamReducer;