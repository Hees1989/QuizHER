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
            console.log('team accepted, functionality?');
            // changes = state.teams.map((team) => {
            //     if (team.teamName === action.payload) {
            //         return {
            //             ...team,
            //             accepted: true,
            //         }
            //     }
            // });
            // state = {
            //     ...state,
            //     teams: {
            //         ...state.teams
            //     }
            //
            // };
            return state;
        case 'TEAM_DECLINED':
            let index = 0;
            state.teams.forEach((team, i) => {
                if (team.teamName === action.payload) {
                    index = i;
                }
            });
            state.teams.splice(index, 1);
            return state;
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