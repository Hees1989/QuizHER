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
                        accepted: false,
                        rejected: false
                    }
                ]
            };
            break;
        case 'TEAM_ACCEPTED':
            console.log(state.teams);
            changes = state.teams.map(team => {
                if (team.teamName === action.payload) {
                    return {
                        ...team,
                        accepted: true,
                    }
                }
            });
            state = {
                ...state,
                changes
            };
            break;
        case 'TEAM_DECLINED':
            console.log(state.teams);
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
    }
    return state;
};

export default teamReducer;