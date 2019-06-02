import React from 'react';
import {setName} from "../actions/userActions";
import {connect} from "react-redux";

class currentQuestion extends React.Component {

    // handleChange = (event) =>{
    //     this.props.setName(event.target.value);
    // };
    //
    // handleSubmit = (event) =>{
    //     alert('A name was submitted: ' + this.props.user.name);
    //     event.preventDefault();
    // };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Answer:
                    <input type="text" value={this.props.user.name} onChange={this.handleChange} />
                </label>
                <p>
                    {this.props.user.name}
                </p>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        answer: state.answer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAnswer: (answer) => {
            dispatch(setAnswer(answer));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(currentQuestion);