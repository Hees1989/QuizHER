import React from 'react';

export const TeamItem = (props) => {
    let teamName = props.team.teamName;
    // let propsje = props;
    return (
        <div>
            {teamName}
            {/*@todo mooi maken*/}
            {/*{propsje}*/}
            <button onClick={() => props.acceptTeam('TEAM_ACCEPTED',teamName)}>Accept</button>
            <button onClick={() => props.declineTeam('TEAM_DECLINED',teamName)}>Decline</button>
        </div>

    );
};