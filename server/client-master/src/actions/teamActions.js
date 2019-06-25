import {teamConstants} from '../constants/constants';

export const registerTeam = (name)=> {
    return {
        type: teamConstants.TEAM_REGISTERED,
        payload: name
    };
};

export const acceptTeam = (name) =>{
    return {
        type: teamConstants.TEAM_ACCEPTED,
        payload: name
    }
};

export function declineTeam(name) {
    return {
        type: teamConstants.TEAM_DECLINED,
        payload: name
    };
}

export function setGivenAnswer(answerObj) {
    return {
        type: teamConstants.TEAM_SET_GIVEN_ANSWER,
        payload: answerObj
    }
}

// TODO gaat nog gebruikt worden voor antwoord goedkeuren
export function increaseScore(name) {
    return {
        type: teamConstants.TEAM_INCREASE_SCORE,
        payload: name
    }
}