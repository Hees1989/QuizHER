import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import user from './reducers/userReducer';
import team from './reducers/teamReducer';
import category from './reducers/categoryReducer';
import questions from './reducers/questionsReducer';
import answer from './reducers/answerReducer';
import round from './reducers/roundReducer';

//const reduxWebsocketMiddleware = reduxWebsocket();

export default createStore(
   combineReducers({
       team,
       user,
       category,
       questions,
       answer,
       round

   }),
    {},
    applyMiddleware(thunk, logger)
);