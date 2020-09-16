import { AUTH } from '../constants/auth';
import { authType } from '../actions/updateAuth';

interface actionType extends authType {
    type: string
}

const defaultState = {
    isAuth: false,
    username: ''
};

const authReducer = (state = defaultState, action: actionType) => {
    switch (action.type) {
        case AUTH:
            return {
                isAuth: action.isAuth,
                username: action.username
            };
        default:
            return state;
    }
}

export default authReducer;