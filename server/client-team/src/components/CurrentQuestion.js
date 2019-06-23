import React from 'react';
import {applyAnswer,appliedAnswer} from "../actions/answerActions";
import {connect} from "react-redux";
import {getWebSocket, openWebSocket} from "../serverCommunication";

class CurrentQuestion extends React.Component {

    componentDidMount() {
        openWebSocket();
        this.checkMessage();
    }

    handleChange = (event) => {
        this.props.setAnswer(event.target.value);
    };

    handleSubmit = (event) => {
        alert('A answer was submitted: ' + this.props.answer);
        this.props.appliedAnswer();
        this.onSocketSend('TEAM_REGISTERED', this.props.answer);
        event.preventDefault();
    };

    onSocketSend = (type, payload)=> {
        const msg = {
            type: type,
            payload: payload
        };
        const ws = getWebSocket();
        ws.send(JSON.stringify(msg));
    }
    checkMessage = () => {
        const ws = getWebSocket();
        ws.onmessage = (msg) => {
            msg = JSON.parse(msg.data);
            switch (msg.type) {
                case 'SELECT_QUESTION':
                    console.log(msg.type);
                    //Krijg vraag binnen
                    break;
                case 'QUESTION_CLOSED':
                    console.log(msg.type)
                    //stuur vraag gesloten
                    break;
                case 'QUIZZER_END':
                    this.props.history.push('/endQuizzer');
                    break;

                default:
            }
        }
    }




    render() {
        // if (!this.props.question) {
        //     return (
        //         <p>"Er is nog geen vraag mi mang"</p>
        //     )
        // }



        return (
        <SendAnswer answer = {this.props.answer} question = {this.props.question}  sent={this.props.sent} onSubmit={this.handleSubmit} onChange={this.handleChange}/>
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
    console.log(state.answer);
    return {
        question:state.answer.question,
        answer:state.answer.newAnswer,
        sent:state.answer.sent
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAnswer: (answer) => {
            dispatch(applyAnswer(answer));
        },
        appliedAnswer: () => {
            dispatch(appliedAnswer());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentQuestion);