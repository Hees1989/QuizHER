import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';
import {declineTeam, acceptTeam, registerTeam} from "../actions/teamActions";
import {getWebSocket, openWebSocket} from "../serverCommunication";
import {TeamItem} from "../components/TeamItem";
import {Link} from "react-router-dom";

class Lobby extends React.Component {
    // TODO alle comments verwijderen als ze echt niet nodig zijn
    componentDidMount() {
        openWebSocket();
        const ws = getWebSocket();
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
                    this.props.acceptTeam(msg.payload);
                    break;
                case 'TEAM_NAME_NOT_ACCEPTED':
                    this.props.declineTeam(msg.payload);
                    break;
                default:
            }
        }
    };

    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     /*quizzer gaat pas van start wanneer quizmaster vraag heeft geselecteerd*/
    //     //this.onSocketSend('QUIZZER_START');
    //
    // };

    onSocketSend = (type, payload)=> {
        const msg = {
            type: type,
            payload: payload
        };
        const ws = getWebSocket();
        ws.send(JSON.stringify(msg));
    };

    showTeamList = () => {
        let teamArray = [];
        let teams = this.props.teams;
        teams.forEach((team, index) => {
            teamArray.push(
                <TeamItem
                    key={index}
                    team={team}
                    acceptTeam={this.onSocketSend}
                    declineTeam={this.onSocketSend}
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
                        <button className="button is-primary"><Link to="/categories">Start Quiz!</Link></button>
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