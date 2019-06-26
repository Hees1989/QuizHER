import React from 'react';

export const TeamItem = (props) => {
    let teamName = props.team.teamName;
    return (
        <div>
            {teamName}
            <button onClick={() => props.declineAndDelete(teamName)}>Decline</button>
        </div>

    );
};