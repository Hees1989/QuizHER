import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';
import {getWebSocket, openWebSocket} from "../serverCommunication";
import {setGivenAnswer} from "../actions/teamActions";
import {Link} from "react-router-dom";
import {AnswerItem} from "../components/AnswerItem";

class ActiveQuestion extends React.Component {
    componentDidMount() {
        openWebSocket();
        this.onSocketSend('TEAM_CURRENT_QUESTION', {
            currentQuestion: this.props.activeQuestion.question,
            currentCategory: this.props.activeQuestion.category
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

    // showAnswersList = () => {
    //     let answerArray = [];
    //     let team = this.props.teams;
    //
    //     return (
    //         team.forEach((team,index) => {
    //       answerArray.push(
    //           <AnswerItem
    //           key={index}
    //           team={team}
    //           acceptAnswer={this.onSocketSend}
    //           declineAnswer={this.onSocketSend}
    //           />
    //       )
    //         })
    //     )
    // }



    handleGoodButton = () => {
        this.onSocketSend("TEAM_INCREASE_SCORE", 1);
    };

    handleBadButton = () => {
        this.onSocketSend("TEAM_INCREASE_SCORE", 0);
    };

    handleStopQuestion =() => {
        // TODO nog stopactie aan toevoegen.
        this.onSocketSend('QUESTION_CLOSED',this.props.team.teamName);
    };

    // handleNewQuestion =() => {
    //     this.onSocketSend('QUESTION_CLOSED',this.props.team.teamName);
    // };

    render() {
        return (
            <div>
                <section className="section">
                    <div className="container">
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

                            {/*{this.showAnswersList()}*/}
                        </div>
                        <button className="button is-danger" onClick={this.handleStopQuestion}>Stop vraag</button>
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