import {teamConstants} from '../constants/constants';

const teamReducer = (state = {
    teams: []
}, action) => {
    let changes;
    switch (action.type) {
        case 'TEAM_REGISTERED':
            state = {
                teams: [
                    ...state.teams,
                    {
                        teamName: action.payload,
                        accepted: true,
                        rejected: false,
                        givenAnswer: '',
                        correctAnswers: 0
                    }
                ]
            };
            break;
        case 'TEAM_ACCEPTED':
            changes = state.teams.map((team) => {
                if (team.teamName === action.payload) {
                    return {
                        ...team,
                        accepted: true,
                    }
                }
            });
            state = {
                ...state,
                teams: {
                    ...state.teams
                }

            };
            break;
        case 'TEAM_DECLINED':
            changes = state.teams.map(team => {
                if (team.teamName === action.payload) {
                    return {
                        ...team,
                        rejected: true,
                    }
                }
            });
            state = {
                ...state,
                changes
            };
            break;
        case teamConstants.TEAM_SET_GIVEN_ANSWER:
            state.teams.forEach((team) => {
                if (team.teamName === action.payload.payload.teamName) {
                    team.givenAnswer = action.payload.payload.givenAnswer;
                }
            });
            return state;
        case teamConstants.TEAM_INCREASE_SCORE:
            state.teams.forEach((team) => {
                if (team.teamName === action.payload.payload.teamName) {
                    team.correctAnswers = team.correctAnswers + 1
                }
            });
            break;
        default:

            break;
    }
    return state;
};

export default teamReducer;