import {teamConstants} from '../constants/constants';

export function setName(name) {
    return {
        type: teamConstants.TEAM_SET_NAME,
        payload: name
    };
}

