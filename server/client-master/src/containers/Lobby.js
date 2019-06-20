import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';
import {declineTeam, acceptTeam, registerTeam} from "../actions/teamActions";

class Lobby extends React.Component {
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