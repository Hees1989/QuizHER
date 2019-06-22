import {questionsConstants} from '../constants/constants';

export function getQuestionsPending() {
    return {
        type: questionsConstants.QUESTIONS_GET_PENDING
    }
}

export function getQuestionsSuccess(questions) {
    return {
        type: questionsConstants.QUESTIONS_GET_SUCCESS,
        questions: questions
    }
}

export function getQuestionsError(error) {
    return {
        type: questionsConstants.QUESTIONS_GET_ERROR,
        error: error
    }
}

export function getTwelveIdeas(category1, category2, category3) {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.
    return (dispatch) => {
        // First dispatch: the app state is updated to inform
        // that the API call is starting.
        dispatch(getQuestionsPending());
        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch(`http://localhost:4000/question/randomQuestions`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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