import React from 'react';
import {applyAnswer,appliedAnswer} from "../actions/answerActions";
import {connect} from "react-redux";
import {getWebSocket, openWebSocket,onSocketSend} from "../serverCommunication";

class CurrentQuestion extends React.Component {

    componentDidMount() {
        openWebSocket();
        this.checkMessage();
    }

    handleChange = (event) => {
        this.props.setAnswer(event.target.value);

    };

    handleSubmit = (event) => {
        alert('A name was submitted: ' + this.props.user.answer);
        // alert('A name was submitted: ' + this.event.target.value);
        // this.props.setName(event.target.value);
        console.log(event);
        onSocketSend('ANSWER_SENT', this.props.user.answer);
        event.preventDefault();
    };


    checkMessage = () => {
        const ws = getWebSocket();
        ws.onmessage = (msg) => {
            msg = JSON.parse(msg.data);
            switch (msg.type) {
                case 'ANSWER_SENT':
                    console.log(msg.type);
                    onSocketSend('ANSWER_SENT',this.props.answer)
                    break;
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




    // postAnswer =() => {
    //     //
    // };
    //
    // getQuestions = () =>{
    //     //
    // };

    render() {
        // if (!this.props.question) {
        //     return (
        //         <p>"Er is nog geen vraag mi mang"</p>
        //     )
        // }

        let Question = this.props.question

        return (

            <form onSubmit={this.handleSubmit}>
                {Question}
                <label>
                    Answer:
                    <input type="text" value={this.props.answer} onChange={this.handleChange}/>
                </label>
                <p>
                    {this.props.user.answer}
                </p>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        question:state.question,
        answer:state.answer,
        applied:state.applied
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAnswer: (answer) => {
            dispatch(applyAnswer(answer));
        },
        applyName: () => {
            dispatch(appliedAnswer());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentQuestion);