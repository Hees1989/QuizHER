import React from 'react';
import {connect} from 'react-redux';
import 'bulma/css/bulma.css';
import {Link} from "react-router-dom";
import {getTwelveIdeas} from '../actions/QuestionsActions';

class QuestionList extends React.Component {
    componentDidMount() {
        this.props.getQuestions('History','Music','Sport');
    }

    render() {
console.log(this.props.questions);

        return (

            <div>

                <section className="section">
                    <div className="container">

                        <span className="button is-primary"><Link to="">Start Round!</Link></span>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        questions: state.questions
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getQuestions: (category1,category2,category3) => dispatch(getTwelveIdeas(category1,category2,category3))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);