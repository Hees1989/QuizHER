import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';
import {declineTeam, acceptTeam, registerTeam} from "../actions/teamActions";
import {getWebSocket, openWebSocket} from "../serverCommunication";

class Lobby extends React.Component {

    componentDidMount() {
        this.openSocket();
        this.checkMessage();
    };

    openSocket() {
        const ws = openWebSocket();
    }

    checkMessage = () => {
        const ws = getWebSocket();
        ws.onmessage = (msg) => {
            msg = JSON.parse(msg.data);
            switch (msg.type) {
                case 'TEAM_NAME_INSERTED':
                    // Als naam is isnerted doe via database krijg teams.
                    break;
                case 'TEAM_NAME_ACCEPTED':
                    //Doe niks dan wacht gewoon af
                    break;
                case 'TEAM_NAME_NOT_ACCEPTED':
                    // Ontvang nog steeds via database teams.
                    break;
                default:
            }
        }
    };

    onSocketSend = (messagetype)=> {
        const msg = {
            type: messagetype
        };
        const ws = getWebSocket();
        ws.send(JSON.stringify(msg));
    }

    acceptTeam = teamName =>{
        // post naar Database welke die moet accepteren
        this.onSocketSend("TEAM_NAME_ACCEPTED")
    }

    refuseTeam = teamId =>{
        // post naar Database welke die niet accepteert
        this.onSocketSend("TEAM_NAME_NOT_ACCEPTED")
    }

    render() {
        return (
            <div>
                <section className="section">
                    <div className="container">
                        Aangemelde gebruikers
                        <button onClick={() => this.props.registerTeam('TeamA')}>Register user A</button>
                        <button onClick={() => this.props.registerTeam('TeamB')}>Register user B</button>
                        <button onClick={() => this.props.acceptTeam('TeamA')}>Accept user</button>
                        <button onClick={() => this.props.declineTeam('TeamB')}>Decline user</button>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        team: state.team.teams
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerTeam: (name) => dispatch(registerTeam(name)),
        acceptTeam: (name) => dispatch(acceptTeam(name)),
        declineTeam: (name) => dispatch(declineTeam(name))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);