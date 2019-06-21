import React from 'react';
import {setName} from "../actions/teamActions";
import {connect} from "react-redux";
import {openWebSocket} from '../serverCommunication'

class ApplyForm extends React.Component {

    componentDidMount() {
        openWebSocket();
    }

    handleChange = (event) =>{
        this.props.setName(event.target.value);
    };

    handleSubmit = (event) =>{
        alert('A name was submitted: ' + this.props.user.name);
        event.preventDefault();
    };

    addMessage(msg) {
        switch (msg.type) {
            case 'test':

                break;

            default:
        }
    };


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