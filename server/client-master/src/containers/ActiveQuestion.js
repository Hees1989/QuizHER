import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';
import {getWebSocket, openWebSocket} from "../serverCommunication";

class ActiveQuestion extends React.Component {
    componentDidMount() {
        openWebSocket();
    }

    onSocketSend = (type, payload)=> {
        const msg = {
            type: type,
            payload: payload
        };
        const ws = getWebSocket();
        ws.send(JSON.stringify(msg));
    };

    render() {
        return (
            <div>
                <section className="section">
                    <div className="container">
                        <h1>Aangemelde gebruikers</h1>
                        <button className="button is-danger" onClick={console.log('close questions')}>Start Quiz!</button>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <h1>Aangemelde gebruikers</h1>
                        <button className="button is-danger" onClick={console.log('close questions')}>Start Quiz!</button>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveQuestion);