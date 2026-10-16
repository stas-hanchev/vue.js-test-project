import {
    addFavoritePlace,
    deleteFavoritePlace,
    getFavoritePlaces,
    updateFavoritePlace,
} from '@/api/favorite-places';

const initialState = () => ({
    places: [],
    activeId: null,
    isLoading: false,
    error: null,
});

export const favoritePlaces = {
    namespaced: true,

    state: initialState,

    getters: {
        getPlaceById: (state) => (id) => state.places.find((place) => place.id === id),
        activePlace: (state, getters) => getters.getPlaceById(state.activeId),
    },

    mutations: {
        SET_PLACES(state, places) {
            state.places = places;
        },
        SET_ACTIVE_ID(state, id) {
            state.activeId = id;
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
        async fetchPlaces({ commit }) {
            commit('SET_LOADING', true);
            commit('SET_ERROR', null);

            try {
                commit('SET_PLACES', await getFavoritePlaces());
            } catch (error) {
                commit('SET_ERROR', error);
            } finally {
                commit('SET_LOADING', false);
            }
        },

        async addPlace({ dispatch }, body) {
            await addFavoritePlace(body);
            await dispatch('fetchPlaces');
        },

        async updatePlace({ dispatch }, body) {
            await updateFavoritePlace(body);
            await dispatch('fetchPlaces');
        },

        async deletePlace({ state, commit, dispatch }, id) {
            await deleteFavoritePlace(id);

            if (state.activeId === id) {
                commit('SET_ACTIVE_ID', null);
            }

            await dispatch('fetchPlaces');
        },
    },
};
