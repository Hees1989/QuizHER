import {questionsConstants} from '../constants/constants';

export function getQuestionsPending() {
    return {
        type: questionsConstants.QUESTIONS_GET_PENDING
    }
}

export function getQuestionsSuccess(questions) {
    return {
        type: questionsConstants.QUESTIONS_GET_SUCCESS,
        questions:questions
    }
}

export function getQuestionsError(error) {
    return {
        type: questionsConstants.QUESTIONS_GET_ERROR,
        error: error
    }
}

export function getTwelveIdeas(category1, category2, category3) {
    return (dispatch) => {
        dispatch(getQuestionsPending());
        return fetch(`http://localhost:4000/question/randomQuestions/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: ({
                category1: category1,
                category2: category2,
                category3: category3,
            })
        }).then(res => res.json(),
            // Do not use catch, because that will also catch
            // any errors in the dispatch and resulting render,
            // causing a loop of 'Unexpected batch number' errors.
            // https://github.com/facebook/react/issues/6895
            error => {
                dispatch(getQuestionsError(error));
            })
            .then(data => {
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.
                return dispatch(getQuestionsSuccess(data))
            })
    }
}