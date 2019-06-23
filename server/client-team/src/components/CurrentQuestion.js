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
        alert('A answer was submitted: ' + this.props.user.answer);
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
        <SendAnswer onSubmit={this.handleSubmit} onChange={this.handleChange} applied={this.props.user.applied}/>
        );
    }
}

function SendAnswer(props){
    if(props.applied === false) {
        return (
            <form onSubmit={(e) =>props.onSubmit(e)}>
                {/*{props.Question}*/}
                <label>
                    Answer:
                    <input type="text" placeholder={'Answer'}
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