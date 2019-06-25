import React from 'react';

export const TeamItem = (props) => {
    let teamName = props.team.teamName;
    return (
        <div>
            {teamName}
            {/*<button onClick={() => props.acceptTeam('TEAM_ACCEPTED',teamName)}>Accept</button>*/}
            <button onClick={() => props.declineAndDelete(teamName)}>Decline</button>
        </div>

    );
};