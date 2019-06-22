import React from 'react';
import {applyAnswer} from "../actions/answerActions";
import {connect} from "react-redux";
import {getWebSocket, openWebSocket} from "../serverCommunication";

class CurrentQuestion extends React.Component {

    componentDidMount() {
        openWebSocket();
        this.checkMessage();
    }

    handleChange = (event) => {


    };

    handleSubmit = (event) => {

    };

    checkMessage = () => {
        const ws = getWebSocket();
        ws.onmessage = (msg) => {
            msg = JSON.parse(msg.data);
            switch (msg.type) {
                case 'ANSWER_SENT':
                    console.log(msg.type);
                    break;
                case 'QUESTION_SELECT':
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
        if (!this.props.question) {
            return (
                <p>"Er is nog geen vraag mi mang"</p>
            )
        }

        let Question = this.props.question

        return (

            <form onSubmit={this.handleSubmit}>
                {Question}
                <label>
                    Answer:
                    <input type="text" value={this.props.user.answer} onChange={this.handleChange}/>
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
        answer:state.answer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAnswer: (answer) => {
            dispatch(applyAnswer(answer));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentQuestion);