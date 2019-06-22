export const registerTeam = (name)=> {
    return {
        type: "TEAM_REGISTERED",
        payload: name
    };
}

export const acceptTeam = (name) =>{
    return {
        type: "TEAM_ACCEPTED",
        payload: name
    }
}

export function declineTeam(name) {
    return {
        type: "TEAM_DECLINED",
        payload: name
    };
}