import React from 'react';

export const AnswerItem = (props) => {
    let teamName = props.team.teamName;
    let answer = props.team.givenAnswer;
    return (
        <div>
            {`${teamName} has given the answer: ${answer}`}
            <button onClick={() => props.acceptAnswer('TEAM_INCREASE_SCORE',1)}>Accept</button>
            <button onClick={() => props.declineAnswer('TEAM_INCREASE_SCORE',0)}>Decline</button>
        </div>

    );
};