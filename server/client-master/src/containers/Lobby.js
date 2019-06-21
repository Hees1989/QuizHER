import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';
import {declineTeam, acceptTeam, registerTeam} from "../actions/teamActions";
import {getSocket, initSocket} from "../actions/webSocketActions";
import {TeamItem} from "../components/TeamItem";
import {Link} from "react-router-dom";

class Lobby extends React.Component {

    componentDidMount() {
        initSocket();
        const ws = getSocket();
        this.checkMessage(ws);
    };

    checkMessage = (ws) => {
        ws.onmessage = (msg) => {
            msg = JSON.parse(msg.data);
            switch (msg.type) {
                case 'TEAM_REGISTERED':
                    this.props.registerTeam(msg.payload);
                    break;
                case 'TEAM_NAME_ACCEPTED':
                    /*implement*/
                    break;
                case 'TEAM_NAME_NOT_ACCEPTED':
                    /*implement*/
                    break;
                default:
            }
        }
    };

    /*Can be used, not necessary. payload can be string or object*/
    onSocketSend = (messageType, payload) => {
        const ws = getSocket();
        ws.send(JSON.stringify({
            type: messageType,
            payload: payload
        }));
    };

    showTeamList = () => {
        let teamArray = [];
        let teams = this.props.teams;
        teams.forEach((team, index) => {
            teamArray.push(
                <TeamItem
                    key={index}
                    team={team}
                    acceptTeam={this.props.acceptTeam}
                    declineTeam={this.props.declineTeam}
                />
            );
        });
        return teamArray;
    };

    render() {
        return (
            <div>
                <section className="section">
                    <div className="container">
                        <h1>Aangemelde gebruikers</h1>
                        {this.showTeamList()}
                        <span className="button is-primary"><Link to="/categories">Start Quiz!</Link></span>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        teams: state.team.teams
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