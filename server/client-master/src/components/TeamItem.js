import React from 'react';

export const TeamItem = (props) => {
    let teamName = props.team.teamName;
    return (
        <div>
            {teamName}
            {/*@todo mooi maken*/}
            <button onClick={() => props.acceptTeam(teamName)}>Accept</button>
            <button onClick={() => props.declineTeam(teamName)}>Decline</button>
        </div>

    );
};