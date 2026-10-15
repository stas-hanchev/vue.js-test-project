import { clientFetch } from '../clientFetch';
import { router } from '@/router';

export const TOKEN_KEY = 'token';

class AuthService {
    #token = null;

    setToken(token) {
        this.#token = token;
        localStorage.setItem(TOKEN_KEY, token);
    }

    getToken() {
        return this.#token;
    }

    clearToken() {
        this.#token = null;
        localStorage.removeItem(TOKEN_KEY);
    }

    isLoggedIn() {
        return Boolean(this.#token);
    }

    async login(body) {
        const { data } = clientFetch.post('/user/login', body);
        const { accessToken } = data;

        this.setToken(accessToken);
    }

    async registerUser(body) {
        const { data } = clientFetch.post('/user/register', body);
        const { accessToken } = data;

        this.setToken(accessToken);
    }

    async logout() {
        await clientFetch.get('/user/logout');

        this.clearToken();
    }

    async refresh() {
        const { data } = await clientFetch.get('/user/refresh');
        const { accessToken } = data;

        this.setToken(accessToken);
    }
}

export const authService = new AuthService();

clientFetch.interceptors.request.use((request) => {
    const token = authService.getToken();

    if (token) {
        request.headers = {
            ...request.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    return request;
});

clientFetch.interceptors.response.use(
    (response) => response,
    async (error) => {
        const errorCode = error.response.status;

        if (errorCode === 401) {
            try {
                return await authService.refresh();
            } catch (err) {
                router.push('/auth/login/');
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    },
);
