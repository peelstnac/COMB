import { AUTH } from '../constants/auth';

const updateAuth = (data) => {
    return {
        type: AUTH,
        ...data
    }
}

export default updateAuth;