import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';

// applying middleware
const mw = applyMiddleware(loggerMiddleware);

// create STORE
const store = createStore(reducer, mw);

export default store;
