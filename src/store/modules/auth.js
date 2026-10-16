import { login, logout, refresh, registerUser } from '@/api/user';

export const TOKEN_KEY = 'token';

const saveToken = (token) => {
    if (token) {
        localStorage.setItem(TOKEN_KEY, token);
    } else {
        localStorage.removeItem(TOKEN_KEY);
    }
};

export const auth = {
    namespaced: true,

    state: () => ({
        token: localStorage.getItem(TOKEN_KEY),
    }),

    getters: {
        isLoggedIn: (state) => Boolean(state.token),
    },

    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
        },
    },

    actions: {
        setToken({ commit }, token) {
            saveToken(token);
            commit('SET_TOKEN', token);
        },

        async login({ dispatch }, body) {
            const { data } = await login(body);
            await dispatch('setToken', data.accessToken);
        },

        async register({ dispatch }, body) {
            const { data } = await registerUser(body);
            await dispatch('setToken', data.accessToken);
        },

        async refresh({ dispatch }) {
            const { data } = await refresh();
            await dispatch('setToken', data.accessToken);
        },

        async logout({ dispatch }) {
            await logout();
            await dispatch('clearSession');
        },

        clearSession({ dispatch, commit }) {
            dispatch('setToken', null);
            commit('user/RESET', null, { root: true });
            commit('favoritePlaces/RESET', null, { root: true });
        },
    },
};
