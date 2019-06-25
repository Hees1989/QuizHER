import React from 'react';
import {setApplied, setName, setDeclined, setCurrentQuestion} from "../actions/teamActions";
import {connect} from "react-redux";
import {openWebSocket,getWebSocket} from '../serverCommunication'

class ApplyForm extends React.Component {

    componentDidMount() {
        openWebSocket();
        this.checkMessage();
    }

    handleChange = (event) => {
        this.props.setName(event.target.value);
        // this.props.setName(event.target.value);

    };

    handleSubmit = (event) => {
        alert('A name was submitted: ' + this.props.user);
        // alert('A name was submitted: ' + this.event.target.value);
        // this.props.setName(event.target.value);
        this.props.applyName();
        this.onSocketSend('TEAM_REGISTERED', this.props.user);
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
            console.log('bericht');
            console.log(msg);
            switch (msg.type) {
                case 'TEAM_REGISTERED':
                    console.log(msg.type);
                    break;
                case 'TEAM_ACCEPTED':
                    console.log('is het deze');
                    console.log(msg.type);
                    break;
                case 'TEAM_DECLINED':
                    this.props.declinedName();
                    break;
                case 'QUIZZER_START':
                    this.props.history.push('/currentQuestion');
                    break;
                case 'TEAM_CURRENT_QUESTION':
                    this.props.setCurrentQuestion(msg.payload);
                    this.props.history.push('/currentQuestion');
                    break;
                default:
            }
        }
    };




    render() {

        return (
            <SendTeamName username ={this.props.user} onSubmit={this.handleSubmit} onChange={this.handleChange} applied={this.props.applied} text={this.props.text}/>


        );
    }
}

 function SendTeamName(props){
    if(props.applied === false) {
        return (
            <form onSubmit={(e) =>props.onSubmit(e)}>
                {props.text}
                <label>
                    Name:
                    <input type="text" placeholder={'Name'}
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
        user: state.user.name,
        applied:state.user.applied,
        text:state.user.text
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch(setName(name));
        },
        applyName: () => {
            dispatch(setApplied());
        },
        declinedName: () => {
            dispatch(setDeclined());
        },
        setCurrentQuestion: (question) => dispatch(setCurrentQuestion(question))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyForm);