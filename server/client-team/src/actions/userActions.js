import {userConstants} from 'constants'

export function setName(name) {
    return {
        type: userConstans.USER_SET_NAME,
        payload: name
    };
}

export function setAnswer(answer) {
    return {
        type: userConstans.USER_SET_ANSWER,
        payload: answer
    };
}