let ws;

export function initSocket() {
    if (ws) {
        ws.onerror = ws.onopen = ws.onclose = null;
        ws.close();
    }
    ws = new WebSocket(`ws://localhost:4000`);
    ws.onerror = () => console.log('Error');
    ws.onopen = () => console.log('Websocket connected!');
    ws.onclose = () => console.log('Websocket closed.');
    //ws.onmessage = (msg) => console.log(JSON.parse(msg.data));
    return ws;
}

export function getSocket() {
    if (ws) {
        return ws;
    } else {
        throw new Error('Websocket not initialized');
    }
}