import React from 'react';
import {setName} from "../actions/teamActions";
import {connect} from "react-redux";
import {openWebSocket,getWebSocket} from '../serverCommunication'

class ApplyForm extends React.Component {

    componentDidMount() {
        openWebSocket();
        this.addMessage();
    }

    handleChange = (event) =>{
        this.props.setName(event.target.value);

    };

    handleSubmit = (event) =>{
        alert('A name was submitted: ' + this.props.user.name);
        this.onSocketSend('TEAMNAME_APPLIED')
        event.preventDefault();
    };

    addMessage = () => {
        const ws = getWebSocket();
        ws.onmessage = (msg) => {
            msg = JSON.parse(msg.data);
            switch (msg.type) {
                case 'TEAMNAME_APPLIED':
                    console.log('gay');
                    break;

                default:
            }
        }
    };

    onSocketSend(messagetype) {
        const msg = {
            type: messagetype
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