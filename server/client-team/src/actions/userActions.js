import {userConstants} from '../constants/constants';

export function setName(name) {
    return {
        type: userConstants.USER_SET_NAME,
        payload: name
    };
}

export function setAnswer(answer) {
    return {
        type: userConstants.USER_SET_ANSWER,
        payload: answer
    };
}