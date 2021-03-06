const port = 4000;
const serverHostname = `${window.location.hostname}:${port}`

let theSocket;

export function openWebSocket() {
    if(theSocket) {
        theSocket.onerror = null;
        theSocket.onopen  = null;
        theSocket.onclose = null;
        theSocket.close();
    }
    console.log("Opening socket for", `ws://${serverHostname}`);
    theSocket = new WebSocket(`ws://${serverHostname}`);
    return theSocket;
}

export function getWebSocket() {
    if( theSocket ) {
        return theSocket;
    }
    else {
        throw new Error("The websocket has not been opened yet.")
    }
}

// function checkFetchError( response ) {
//     return response.ok
//         ? response.json()
//         : Promise.reject(new Error('Unexpected response'));
// }
