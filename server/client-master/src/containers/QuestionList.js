import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';
import {Link} from "react-router-dom";
import {getTwelveIdeas, selectQuestion} from '../actions/QuestionsActions';
import {getWebSocket, openWebSocket} from "../serverCommunication";

class QuestionList extends React.Component {
    componentDidMount() {
        openWebSocket();
        const ws = getWebSocket();
        this.checkMessage(ws);
        let categories = this.props.location.state;
        console.log(categories)
        this.props.getQuestions(categories.categories[0],categories.categories[1],categories.categories[2]);
    }


    checkMessage = (ws) => {
        ws.onmessage = (msg) => {
            msg = JSON.parse(msg.data);
            switch (msg.type) {
                case 'ANSWER_SENT':
                    console.log(msg.type)
                    break;
                default:
            }
        }
    };

    showQuestions = () => {
        let questionsArray = [];
        // let questions = this.props.questions.questions;
        let questions =this.props.questions.questions


        console.log(questions);
        questions.map((question, i) => {
            questionsArray.push(
                <div key={i} >
                    <p>

                    </p>
                    <label htmlFor={question.question}>
                        <input
                            type="checkbox"
                            id={question.question}
                            // value={false}
                            onChange={e =>this.props.selectQuestion(e.target.id)}
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
                        {/*<form>*/}
                            {this.showQuestions()}
                        {/*</form>*/}
                        {/*<span className="button is-primary">*/}
                            {/*<Link to={{*/}
                                {/*pathname: '/'*/}
                            {/*}}>Start quizzer</Link>*/}

                       {/*</span>*/}
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questions,
        selectedQuestion:state.selectedQuestion
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getQuestions: (category1,category2,category3) => dispatch(getTwelveIdeas(category1,category2,category3)),
        selectQuestion:(question)=> dispatch(selectQuestion(question))
        // startQuestion: startQuestion
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);