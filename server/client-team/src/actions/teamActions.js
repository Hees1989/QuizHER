import {teamConstants} from '../constants/constants';


export function setName(name) {
    return {
        type: teamConstants.TEAM_SET_NAME,
        payload: name
    };
}

export function setApplied() {
    return {
        type: teamConstants.TEAM_APPLIED,
        payload: true
    };
}

export function setDeclined() {
    return {
        type: teamConstants.TEAM_DECLINED,
        payload: false
    };
}

export function postTeamNamePending() {
    return {
        type: teamConstants.TEAM_NAME_GET_PENDING
    }
}

export function postTeamNameSuccess(name) {
    return {
        type: teamConstants.TEAM_NAME_GET_SUCCESS,
        payload: name
    }
}

export function postTeamNameError(error) {
    return {
        type: teamConstants.TEAM_NAME_GET_ERROR,
        error: error
    }
}

export function addTeamName(name) {
    return (dispatch) => {
        dispatch(postTeamNamePending());
        return fetch(`http://localhost:4000/team/addTeamName/${name}`, {
            method: 'POST',
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
                dispatch(postTeamNameError(error));
            }
        )
            .then(data => {
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.
                return dispatch(postTeamNameSuccess(data))
            })
    }
}
