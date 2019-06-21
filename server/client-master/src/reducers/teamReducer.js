const teamReducer = (state = {
    teams: [

    ]
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
                        rejected: false
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
        default:

            break;
    }
    return state;
};

export default teamReducer;