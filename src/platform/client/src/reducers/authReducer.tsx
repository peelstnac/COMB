import { AUTH } from '../constants/auth';
import { AuthType } from '../actions/updateAuth';

interface actionType extends AuthType {
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