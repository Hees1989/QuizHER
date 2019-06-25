import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';
import {getWebSocket, openWebSocket} from "../serverCommunication";

class ActiveQuestion extends React.Component {
    componentDidMount() {
        openWebSocket();
        this.onSocketSend('TEAM_CURRENT_QUESTION', {
            currentQuestion: this.props.activeQuestion.question
        });
    }

    onSocketSend = (type, payload)=> {
        const msg = {
            type: type,
            payload: payload
        };
        const ws = getWebSocket();
        ws.onopen = () => ws.send(JSON.stringify(msg));
    };

    render() {
        return (
            <div>
                <section className="section">
                    <div className="container">
                        <h1>Huidige vraag: </h1>
                        <p>{this.props.activeQuestion.question}</p>
                        <p>{this.props.activeQuestion.answer}</p>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <h1>Gegeven antwoorden</h1>
                        <div>Teamnaam - gegeven antwoord..</div>
                        <div>Teamnaam - gegeven antwoord..</div>
                        <div>Teamnaam - gegeven antwoord..</div>
                        <button className="button is-danger" onClick={console.log('close questions')}>Stop vraag</button>
                        <button className="button is-primary" onClick={console.log('close questions')}>Nieuwe vraag</button>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeQuestion: state.questions.questions[state.questions.selectedQuestion]
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveQuestion);