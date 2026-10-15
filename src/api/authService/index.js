import { clientFetch } from '../clientFetch';

export const TOKEN_KEY = 'token';

class AuthService {
    #token = null;

    setToken(token) {
        this.#token = token;
        localStorage.setItem(TOKEN_KEY, token);
        clientFetch.defaults.headers.common = { Authorization: `Bearer ${token}` };
    }

    clearToken() {
        this.#token = null;
        localStorage.removeItem(TOKEN_KEY);
        clientFetch.defaults.headers.common = {};
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
        return clientFetch.get('/user/refresh');
    }
}

export const authService = new AuthService();
