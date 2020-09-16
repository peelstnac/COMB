import { AUTH } from '../constants/auth';

export interface AuthType {
    isAuth: boolean,
    username: string
}

export const updateAuth = (data: AuthType) => {
    return {
        type: AUTH,
        ...data
    }
}