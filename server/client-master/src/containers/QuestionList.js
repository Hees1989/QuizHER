import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';
import {Link} from "react-router-dom";
import {getTwelveIdeas, removeQuestion, selectQuestion} from '../actions/QuestionsActions';
import {getWebSocket, openWebSocket} from "../serverCommunication";

class QuestionList extends React.Component {
    componentWillMount() {
        if (this.props.questions.questions.length > 0) {
            this.props.removeQuestion();
        }
    }

    componentDidMount() {
        openWebSocket();
        let categories = this.props.location.state;
        if (!this.props.questions.questions.length > 0) {
            if (categories) {
                this.props.getQuestions(categories.categories[0],categories.categories[1],categories.categories[2]);
            } else {
                this.props.history.push('/endOfRound');
            }
        }

    }

    chooseQuestion = (question) => {
        console.log(question);
        this.props.selectQuestion(question);
        this.onSocketSend("SELECT_QUESTION", question);
    };

    onSocketSend = (type, payload)=> {
        const msg = {
            type: type,
            payload: payload
        };
        const ws = getWebSocket();
        ws.send(JSON.stringify(msg));
    }

    showQuestions = () => {
        let questionsArray = [];
        let questions =this.props.questions.questions;


        questions.map((question, i) => {
            questionsArray.push(
                <div key={i} >
                    <p>

                    </p>
                    <label htmlFor={question.question}>
                        <input
                            type="checkbox"
                            id={i}
                            onChange={e =>this.chooseQuestion(e.target.id)}
                        />
                        {question.question}
                    </label>
                    <br />
                    <label htmlFor={question.answer}>
                        Answer: {question.answer}
                    </label>
                </div>
            );
        });
        return questionsArray;
    };

    render() {
        return (
            <div>
                <section className="section">
                    <div className="container">
                        <h1>Questions</h1>
                        <form>
                            {this.showQuestions()}
                        </form>
                        <span className="button is-primary"><Link to="/activeQuestion">Start vraag</Link></span>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questions,
        selectedQuestion: state.selectedQuestion
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getQuestions: (category1,category2,category3) => dispatch(getTwelveIdeas(category1,category2,category3)),
        selectQuestion:(question)=> dispatch(selectQuestion(question)),
        removeQuestion: () => dispatch(removeQuestion())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);