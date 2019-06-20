const teamReducer = (state = {
    teams: [
        {
            teamName: 'Team A',
            accepted: false
        },
        {
            teamName: 'Team B',
            accepted: false
        }
    ]
}, action) => {
    switch (action.type) {
        case 'TEAM_REGISTERED':
            state = {
                ...state,
                teams: {

                }
            };
            break;
        case 'TEAM_ACCEPT':
            state = {
                ...state,
                accepted: true
            };
            break;
        case 'TEAM_DECLINE':
            state = {
                ...state,

            }
            break;
    }
    return state;
};

export default teamReducer;