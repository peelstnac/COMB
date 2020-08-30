import pageReducer from './pageReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({ page: pageReducer, auth: authReducer });

export default rootReducer;