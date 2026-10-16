import { clientFetch } from '../clientFetch';

export const login = async (body) => {
    return clientFetch.post('/user/login', body);
};

export const registerUser = async (body) => {
    return clientFetch.post('/user/register', body);
};

export const logout = async () => {
    return clientFetch.get('/user/logout');
};

export const refresh = async () => {
    return clientFetch.get('/user/refresh');
};

export const getUserInfo = () => {
    return clientFetch.get('/user/me');
}
