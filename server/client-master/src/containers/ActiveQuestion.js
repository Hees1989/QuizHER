import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';
import {getWebSocket, openWebSocket} from "../serverCommunication";
import {setGivenAnswer} from "../actions/teamActions";
import {Link} from "react-router-dom";

class ActiveQuestion extends React.Component {
    componentDidMount() {
        openWebSocket();
        this.onSocketSend('TEAM_CURRENT_QUESTION', {
            currentQuestion: this.props.activeQuestion.question,
            currentCategory: this.props.activeQuestion.category
        });
        const ws = getWebSocket();
        this.checkMessage(ws);
        this.startTimer();
    }

    startTimer = () => {
        let countDown = 30;
        let timerDiv = document.getElementById('timer');
        let questionCountDown = setInterval(() => {
            timerDiv.innerHTML = ""+countDown;
            countDown--;
            if (countDown === -1) {
                timerDiv.innerHTML = "Tijd is voorbij!";
                clearInterval(questionCountDown);
            }
        }, 1000);
    };

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
        console.log(msg);
        const ws = getWebSocket();
        ws.onopen = () => {
            ws.send(JSON.stringify(msg))
        };

    };

    handleGoodButton = () => {
        this.onSocketSend("TEAM_INCREASE_SCORE", 1);
    };

    handleBadButton = () => {
        this.onSocketSend("TEAM_INCREASE_SCORE", 0);
    };

    render() {
        return (
            <div>
                <section className="section">
                    <div className="container">
                        <div id="timer">

                        </div>
                        <h1>Huidige vraag: </h1>
                        <p>{this.props.activeQuestion.category}</p>
                        <p>{this.props.activeQuestion.question}</p>
                        <p>{this.props.activeQuestion.answer}</p>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <h1>Gegeven antwoorden</h1>
                        <div id="answers">

                        </div>
                        <button className="button is-primary" onClick={this.handleNewQuestion}><Link to="/selectQuestion">Nieuwe vraag</Link></button>
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