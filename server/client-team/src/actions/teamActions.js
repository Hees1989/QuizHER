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

