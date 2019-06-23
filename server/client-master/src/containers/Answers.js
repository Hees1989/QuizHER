import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';
import {getWebSocket, openWebSocket} from "../serverCommunication";
import {Link} from "react-router-dom";

class Lobby extends React.Component {

    componentDidMount() {
        openWebSocket();
        const ws = getWebSocket();
        this.checkMessage(ws);
    };

    checkMessage = (ws) => {
        ws.onmessage = (msg) => {
            msg = JSON.parse(msg.data);
            switch (msg.type) {
                case 'ANSWER_SENT':
                    console.log(msg);
                    // this.props.registerTeam(msg.payload);
                    break;
                case 'TEAM_REGISTERED':
                    console.log(msg);
                    // this.props.registerTeam(msg.payload);
                    break;
                default:
            }
        }
    };


    handleSubmit = (event) => {
        event.preventDefault();
        // this.onSocketSend('QUIZZER_START');

    };

    onSocketSend = (type, payload)=> {
        const msg = {
            type: type,
            payload: payload
        };
        const ws = getWebSocket();
        ws.send(JSON.stringify(msg));
    }




    render() {
        return (
            <div>
                <section className="section">
                    <div className="container">
                        <h1>Aangemelde gebruikers</h1>
                        <button className="button is-primary" onClick={this.handleSubmit}><Link to="/categories">Start Quiz!</Link></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);