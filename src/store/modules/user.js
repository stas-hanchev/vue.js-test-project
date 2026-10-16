import { getUserInfo } from '@/api/user';

const initialState = () => ({
    user: null,
    isLoading: false,
    error: null,
});

export const user = {
    namespaced: true,

    state: initialState,

    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        SET_LOADING(state, isLoading) {
            state.isLoading = isLoading;
        },
        SET_ERROR(state, error) {
            state.error = error;
        },
        RESET(state) {
            Object.assign(state, initialState());
        },
    },

    actions: {
        async fetchUser({ commit }) {
            commit('SET_LOADING', true);
            commit('SET_ERROR', null);

            try {
                const { data } = await getUserInfo();
                commit('SET_USER', data);
            } catch (error) {
                commit('SET_ERROR', error);
            } finally {
                commit('SET_LOADING', false);
            }
        },
    },
};
