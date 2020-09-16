import { AUTH } from '../constants/auth';

export interface authType {
    isAuth: boolean,
    username: string
}

export const updateAuth = (data: authType) => {
    return {
        type: AUTH,
        ...data
    }
}