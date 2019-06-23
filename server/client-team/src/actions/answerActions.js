import {answerConstants} from "../constants/constants";
import {questionConstants} from "../constants/constants";

export const applyAnswer = (answer) => {
    return {
        type: answerConstants.APPLY_ANSWER,
        payload: answer
    }
};

export const resetAnswer = () => {
    return {
        type: answerConstants.RESET_ANSWER
    }
};

export const appliedAnswer = () => {
    return {
        type: answerConstants.APPLIED_ANSWER,
        payload:true
    }
};

export const changedAnswer = () =>{
    return {
        type:answerConstants.CHANGE_ANSWER
    }
};

export const setQuestion = (question) => {
    return {
        type: "SET_QUESTION",
        payload: question
    }
};

