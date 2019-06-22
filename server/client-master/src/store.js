import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
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
    applyMiddleware(thunk, logger)
);