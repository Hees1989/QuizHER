import React from 'react';
import {setApplied, setName,setDeclined} from "../actions/teamActions";
import {connect} from "react-redux";
import {openWebSocket,getWebSocket,onSocketSend} from '../serverCommunication'

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
        alert('A name was submitted: ' + this.props.user.name);
        // alert('A name was submitted: ' + this.event.target.value);
        // this.props.setName(event.target.value);
        console.log(event);
        this.props.applyName();
        onSocketSend('TEAM_REGISTERED', this.props.user.name);
        event.preventDefault();
    };

    checkMessage = () => {
        const ws = getWebSocket();
        ws.onmessage = (msg) => {
            msg = JSON.parse(msg.data);
            switch (msg.type) {
                case 'TEAM_REGISTERED':
                    console.log(msg.type);
                    break;
                case 'TEAM_ACCEPTED':
                    console.log(msg.type);
                    break;
                case 'TEAM_DECLINED':
                    this.props.declinedName();
                    break;
                case 'QUIZZER_START':
                    this.props.history.push('/currentQuestion');
                    break;

                default:
            }
        }
    };




    render() {

        return (
            <SendTeamName username ={this.props.user.name} onSubmit={this.handleSubmit} onChange={this.handleChange} applied={this.props.user.applied} text={this.props.user.text}/>


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
        user: state.user,
        applied:state.applied,
        text:state.text
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyForm);