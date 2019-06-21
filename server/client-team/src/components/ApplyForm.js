import React from 'react';
import {setName} from "../actions/teamActions";
import {connect} from "react-redux";
import {openWebSocket,getWebSocket} from '../serverCommunication'

class ApplyForm extends React.Component {

    componentDidMount() {
        openWebSocket();
        this.checkMessage();
    }

    handleChange = (event) =>{
        this.props.setName(event.target.value);

    };

    handleSubmit = (event) =>{
        alert('A name was submitted: ' + this.props.user.name);
        this.onSocketSend('TEAM_REGISTERED', this.props.user.name);
        event.preventDefault();
    };

    checkMessage = () => {
        const ws = getWebSocket();
        ws.onmessage = (msg) => {
            msg = JSON.parse(msg.data);
            switch (msg.type) {
                case 'TEAM_REGISTERED':
                    console.log('gay');
                    break;

                default:
            }
        }
    };

    onSocketSend(messagetype, payload) {
        const msg = {
            type: messagetype,
            payload: payload
        };
        const ws = getWebSocket();
        ws.send(JSON.stringify(msg));
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.props.user.name} onChange={this.handleChange} />
                </label>
                <p>
                    {console.log(this.props)}
                </p>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch(setName(name));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplyForm);