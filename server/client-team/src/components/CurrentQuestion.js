import React from 'react';
import {applyAnswer} from "../actions/answerActions";
import {connect} from "react-redux";

class CurrentQuestion extends React.Component {

    handleChange = (event) =>{
        this.props.setAnswer(event.target.value);
    };

    handleSubmit = (event) =>{
        alert('A name was submitted: ' + this.props.user.answer);
        event.preventDefault();
    };

    postAnswer =() => {
        //
    };

    getQuestions = () =>{
        //
    };

    render() {
        if (!this.props.question) {
            return (
                <p>"Er is nog geen vraag mi mang"</p>
            )
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Answer:
                    <input type="text" value={this.props.user.answer} onChange={this.handleChange} />
                </label>
                <p>
                    {this.props.user.answer}
                </p>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user:state.user
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