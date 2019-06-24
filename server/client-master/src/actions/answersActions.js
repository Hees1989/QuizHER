export const receiveAnswer = (answer)=> {
    return {
        type: "ANSWER_SENT",
        payload: answer
    };
};
