import {createStore, combineReducers, applyMiddleware} from 'redux';
//import reduxWebsocket from '@giantmachines/redux-websocket';
import logger from 'redux-logger';

import user from './reducers/userReducer';
import team from './reducers/teamReducer';

//const reduxWebsocketMiddleware = reduxWebsocket();

export default createStore(
   combineReducers({
       team,
       user
   }),
    {},
    applyMiddleware(/*reduxWebsocketMiddleware, */logger)
);