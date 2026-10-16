import { clientFetch } from '../clientFetch';
import { router } from '@/router';

export const TOKEN_KEY = 'token';

const NO_REFRESH_URLS = ['/user/login', '/user/register', '/user/refresh'];

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
        const { data } = await clientFetch.post('/user/login', body);
        const { accessToken } = data;

        this.setToken(accessToken);
    }

    async registerUser(body) {
        const { data } = await clientFetch.post('/user/register', body);
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
        const originalRequest = error.config;
        const errorCode = error.response?.status;
        const isAuthRequest = NO_REFRESH_URLS.includes(originalRequest?.url);

        if (errorCode !== 401 || isAuthRequest || originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            await authService.refresh();
        } catch (err) {
            authService.clearToken();
            router.push('/auth/login');
            return Promise.reject(err);
        }

        return clientFetch(originalRequest);
    },
);
