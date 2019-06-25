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
        // TODO doen hetzelfde, die in comment kan dus weg
        //this.props.setAnswer(event.target.value);
        this.props.setGivenAnswer(event.target.value);
    };

    handleSubmit = () => {
        alert('A answer was submitted: ' + this.props.team.givenAnswer);
        //TODO kan weg, wordt al geset in didMount hierboven
        //this.props.appliedAnswer();
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

    // TODO dit component doet niks met sockets, kan weg?
    checkMessage = () => {
        const ws = getWebSocket();
        ws.onmessage = (msg) => {
            msg = JSON.parse(msg.data);
            switch (msg.type) {
                case 'SELECT_QUESTION':
                    //console.log(msg.type);
                    //Krijg vraag binnen
                    break;
                case 'ANSWER_SENT':
                    //console.log(msg)
                    //stuur vraag gesloten
                    break;
                case 'QUIZZER_END':
                    // TODO pad bestaat nog niet
                    this.props.history.push('/endQuizzer');
                    break;
                default:
            }
        }
    };

    render() {
        return (
            <div>
                {this.props.team.currentQuestion.currentQuestion}
                <SendAnswer sent={this.props.sent} onSubmit={this.handleSubmit} onChange={this.handleChange}/>
            </div>
        );
    }
}

function SendAnswer(props){
    // TODO netter maken
    if(props.sent === false) {
        return (
            <form onSubmit={(e) =>props.onSubmit(e)}>
                <label>
                    Answer:
                    <input type="text" placeholder={'haha'}
                           onChange={(e) =>props.onChange(e)}/>
                </label>
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
        //question: state.answer.question,
        //answer: state.answer.newAnswer,
        sent: state.team.sent,
        team: state.team
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // setAnswer: (answer) => {
        //     dispatch(applyAnswer(answer));
        // },
        appliedAnswer: () => {
            dispatch(appliedAnswer());
        },
        setGivenAnswer: (answer) => dispatch(setGivenAnswer(answer))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentQuestion);