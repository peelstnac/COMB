import pageReducer from './pageReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ page: pageReducer });

export default rootReducer;