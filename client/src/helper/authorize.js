import { setCookie, getCookie, deleteCookie } from './cookies';
import {
    setLocalStorage,
    getLocalStorage,
    deleteLocalStorage,
} from './localStorage';

export const setAuthentication = ( token,user) => {
    setCookie('token', token);
    setCookie('user', JSON.stringify(user));
    setLocalStorage('user', user);
};

export const isAuthenticated = () => {
    if ( getLocalStorage('user')) {
        return getLocalStorage('user');
    } else {
        return false;
    }
};

export const logout = (next) => {
    deleteCookie('token');
    deleteLocalStorage('user');

    next();
};
