import { clientFetch } from './clientFetch';

const NO_REFRESH_URLS = ['/user/login', '/user/register', '/user/refresh'];

export const setupInterceptors = (store, router) => {
    clientFetch.interceptors.request.use((request) => {
        const { token } = store.state.auth;

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
                await store.dispatch('auth/refresh');
            } catch (err) {
                await store.dispatch('auth/clearSession');
                router.push('/auth/login');
                return Promise.reject(err);
            }

            return clientFetch(originalRequest);
        },
    );
};
