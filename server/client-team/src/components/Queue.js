import React from 'react';
import {connect} from "react-redux";
import {getWebSocket, openWebSocket} from "../serverCommunication";
import {setCurrentQuestion} from "../actions/teamActions";

class Queue extends React.Component {

    componentDidMount() {
        openWebSocket();
        this.checkMessage();
    }

    checkMessage = () => {
        const ws = getWebSocket();
        ws.onmessage = (msg) => {
            msg = JSON.parse(msg.data);
            switch (msg.type) {
                case 'TEAM_CURRENT_QUESTION':
                    this.props.setCurrentQuestion(msg.payload);
                    this.props.history.push('/currentQuestion');
                    break;
                case '':

                    break;
                default:
            }
        }
    };

    render() {
        // TODO : make nicer queue screen

        return (
            <div>
                Waiting...
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        team: state.team
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentQuestion: (question) => dispatch(setCurrentQuestion(question))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Queue);