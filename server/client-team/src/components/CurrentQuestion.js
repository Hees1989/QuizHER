import React from 'react';
import {applyAnswer,appliedAnswer} from "../actions/answerActions";
import {connect} from "react-redux";
import {getWebSocket, openWebSocket} from "../serverCommunication";
import {setGivenAnswer} from "../actions/teamActions";

class CurrentQuestion extends React.Component {

    componentDidMount() {
        openWebSocket();
        this.checkMessage();
    }

    handleChange = (event) => {
        this.props.setAnswer(event.target.value);
        this.props.setGivenAnswer(event.target.value);
    };

    handleSubmit = (event) => {
        alert('A answer was submitted: ' + this.props.team.givenAnswer);
        this.props.appliedAnswer();
        this.onSocketSend('ANSWER_SENT', {
            teamName: this.props.team.name,
            givenAnswer: this.props.team.givenAnswer
        });
        event.preventDefault();
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
                case 'SELECT_QUESTION':
                    console.log(msg.type);
                    //Krijg vraag binnen
                    break;
                case 'ANSWER_SENT':
                    console.log(msg)
                    //stuur vraag gesloten
                    break;
                case 'QUIZZER_END':
                    this.props.history.push('/endQuizzer');
                    break;

                default:
            }
        }
    };




    render() {
        // if (!this.props.question) {
        //     return (
        //         <p>"Er is nog geen vraag mi mang"</p>
        //     )
        // }

        return (
            <div>
                {this.props.team.currentQuestion.currentQuestion}
                <SendAnswer answer = {this.props.answer} question = {this.props.question}  sent={this.props.sent} onSubmit={this.handleSubmit} onChange={this.handleChange}/>
            </div>
        );
    }
}

function SendAnswer(props){
    if(props.sent === false) {
        return (
            <form onSubmit={(e) =>props.onSubmit(e)}>
                {props.question}
                <label>
                    Answer:
                    <input type="text" placeholder={'haha'}
                           onChange={(e) =>props.onChange(e)}/>
                </label>
                <p>
                </p>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
    else{
        return(
            <p>haha</p>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        question:state.answer.question,
        answer:state.answer.newAnswer,
        sent:state.answer.sent,
        team: state.team
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAnswer: (answer) => {
            dispatch(applyAnswer(answer));
        },
        appliedAnswer: () => {
            dispatch(appliedAnswer());
        },
        setGivenAnswer: (answer) => dispatch(setGivenAnswer(answer))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentQuestion);