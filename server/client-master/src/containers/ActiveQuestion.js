import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';
import {getWebSocket, openWebSocket} from "../serverCommunication";
import {setGivenAnswer} from "../actions/teamActions";
import {TeamItem} from "../components/TeamItem";
import {Link} from "react-router-dom";

class ActiveQuestion extends React.Component {
    componentDidMount() {
        openWebSocket();
        this.onSocketSend('TEAM_CURRENT_QUESTION', {
            currentQuestion: this.props.activeQuestion.question
        });
        const ws = getWebSocket();
        this.checkMessage(ws);
    }

    checkMessage = (ws) => {
        ws.onmessage = (msg) => {
            msg = JSON.parse(msg.data);
            switch (msg.type) {
                case 'ANSWER_SENT':
                    this.props.setGivenAnswer(msg);

                    /*@todo Slordige manier om div te vullen, later even aanpassen*/
                    let answers = this.props.teams;
                    let answerDiv = document.getElementById('answers');
                    answerDiv.innerHTML = '';
                    answers.forEach((answer) => {
                        answerDiv.innerHTML += "<div>" +
                            answer.teamName + "<br />" +
                            answer.givenAnswer +
                            "<button id='good'>Good</button>" +
                            "<button id='bad'>Bad</button>" +
                            "</div>";
                    });
                    break;
                case '':

                    break;
                default:
            }
        }
    };

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
                        <div id="answers">

                        </div>
                        <button className="button is-danger" onClick={console.log('close questions')}>Stop vraag</button>
                        <button className="button is-primary"><Link to="/selectQuestion">Nieuwe vraag</Link></button>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activeQuestion: state.questions.questions[state.questions.selectedQuestion],
        teams: state.team.teams
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setGivenAnswer: (answerObj) => dispatch(setGivenAnswer(answerObj))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveQuestion);