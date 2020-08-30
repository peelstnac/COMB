import { AUTH } from '../constants/auth';

const defaultState = {
    isAuth: false,
    username: ''
};

const authReducer = (state = defaultState, action) => {
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