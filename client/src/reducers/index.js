import { combineReducers } from 'redux';
import questions from './questions';
import auth from './auth';

export const reducers = combineReducers({
    questions,
    auth,
});