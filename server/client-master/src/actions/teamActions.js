import {teamConstants} from '../constants/constants';

export const registerTeam = (name)=> {
    return {
        type: "TEAM_REGISTERED",
        payload: name
    };
}

export const acceptTeam = (name) =>{
    return {
        type: "TEAM_ACCEPTED",
        payload: name
    }
}

export function declineTeam(name) {
    return {
        type: "TEAM_DECLINED",
        payload: name
    };
}

export function teamNameSuccess(success) {
    return {
        type: teamConstants.TEAM_GET_SUCCESS,
        payload: success
    }
}

export function teamNameError(error) {
    return {
        type: teamConstants.TEAM_GET_ERROR,
        payload: error
    }
}

export function teamNamePending() {
    return {
        type: teamConstants.TEAM_GET_PENDING
    }
}


export function getAllTeams(id) {
    return (dispatch) => {
        dispatch(teamNamePending());
        return fetch(`http://localhost:4000/team/getAllTeams`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res.json(),

            // Do not use catch, because that will also catch
            // any errors in the dispatch and resulting render,
            // causing a loop of 'Unexpected batch number' errors.
            // https://github.com/facebook/react/issues/6895
            error => {
                dispatch(teamNameError(error));
            }
        )
            .then(data => {
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.
                return dispatch(teamNameSuccess(data))
            })
    }
}

export function rejectTeam(id) {
    return (dispatch) => {
        dispatch(teamNamePending());
        return fetch(`http://localhost:4000/team/reject/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: id
            })
        }).then(res => res.json(),

            // Do not use catch, because that will also catch
            // any errors in the dispatch and resulting render,
            // causing a loop of 'Unexpected batch number' errors.
            // https://github.com/facebook/react/issues/6895
            error => {
                dispatch(teamNameError(error));
            }
        )
            .then(data => {
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.
                return dispatch(teamNameSuccess(data))
            })
    }
}
