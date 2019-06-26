import React from 'react';
import {applyAnswer,appliedAnswer} from "../actions/answerActions";
import {connect} from "react-redux";
import {getWebSocket, openWebSocket} from "../serverCommunication";
import {setCurrentQuestion, setGivenAnswer} from "../actions/teamActions";

class CurrentQuestion extends React.Component {

    componentDidMount() {
        openWebSocket();
        this.checkMessage();
        this.startTimer();
    }

    handleChange = (event) => {
        this.props.setGivenAnswer(event.target.value);
    };

    startTimer = () => {
        let timerDiv = document.getElementById('timer');
        let countDown = 30;
        let questionCountDown = setInterval(() => {
            timerDiv.innerHTML = ""+countDown;
            countDown--;
            if (countDown === -1) {
                timerDiv.innerHTML = "Tijd is voorbij!";
                clearInterval(questionCountDown);
                this.props.history.push('/queue');
            }
        }, 1000);
    };

    handleSubmit = () => {
        alert('A answer was submitted: ' + this.props.team.givenAnswer);
        this.onSocketSend('ANSWER_SENT', {
            teamName: this.props.team.name,
            givenAnswer: this.props.team.givenAnswer
        });
        this.props.history.push('/queue');
    };

    onSocketSend = (type, payload)=> {
        const msg = {
            type: type,
            payload: payload
        };
        const ws = getWebSocket();
        ws.send(JSON.stringify(msg));
    };

    checkMessage = () => {
        const ws = getWebSocket();
        ws.onmessage = (msg) => {
            msg = JSON.parse(msg.data);
            switch (msg.type) {
                case 'TEAM_CURRENT_QUESTION':
                    this.props.setCurrentQuestion(msg.payload);
                    this.props.history.push('/currentQuestion');
                    break;
                case 'QUESTION_CLOSED':
                    break;
                case 'SELECT_QUESTION':

                    break;
                case 'ANSWER_SENT':
                    console.log(msg)
                    break;
                case 'QUIZZER_END':
                    this.props.history.push('/endQuizzer');
                    break;
                default:
            }
        }
    };

    render() {
        return (
            <div>
                <div id="timer">

                </div>
                {this.props.team.currentQuestion.currentQuestion}
                <SendAnswer sent={this.props.sent} onSubmit={this.handleSubmit} onChange={this.handleChange}/>
            </div>
        );
    }
}

function SendAnswer(props){
    if(props.sent === false) {
        return (
            <form onSubmit={(e) =>props.onSubmit(e)}>
                <label>
                    Answer:
                    <input id="input" type="text" placeholder={'haha'}
                           onChange={(e) =>props.onChange(e)}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
    else{
        return(
            <p>U heeft al geantwoord</p>
        )
    }
}

const mapStateToProps = (state) => {
    return {

        sent: state.team.sent,
        team: state.team
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentQuestion: (question) => dispatch(setCurrentQuestion(question)),
        setGivenAnswer: (answer) => dispatch(setGivenAnswer(answer))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentQuestion);