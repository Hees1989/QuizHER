import {createStore, combineReducers, applyMiddleware} from 'redux';
//import reduxWebsocket from '@giantmachines/redux-websocket';
import logger from 'redux-logger';

import user from './reducers/teamReducer';
import answer from './reducers/answerReducer';
import team from './reducers/teamReducer';

//const reduxWebsocketMiddleware = reduxWebsocket();

export default createStore(
   combineReducers({
       user,
       answer,
       team
   }),
    {},
    applyMiddleware(/*reduxWebsocketMiddleware, */logger)
);