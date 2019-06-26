import React from "react";

class QuestionDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentQuestion: this.props.currentQuestion,
            currentCategory: this.props.currentCategory
        };
    }

    showQuestionDetails = () => {
        return (
            <div className="QuestionDetails">
                {`Question: ${this.state.currentQuestion}
                 Category: ${this.state.currentCategory}
                `}
            </div>
        )
    };


    render() {
        return (
            <div className="Question">
                {this.showQuestionDetails()}
            </div>
        )
    }
}

export default QuestionDetails;