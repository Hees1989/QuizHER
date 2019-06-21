export function registerTeam(name) {
    return {
        type: "TEAM_REGISTERED",
        payload: name
    };
}

export function acceptTeam(name) {
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