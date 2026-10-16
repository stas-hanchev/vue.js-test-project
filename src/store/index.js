import { createStore } from 'vuex';

import { auth } from './modules/auth';
import { user } from './modules/user';
import { favoritePlaces } from './modules/favoritePlaces';

export const store = createStore({
    strict: import.meta.env.DEV,
    modules: {
        auth,
        user,
        favoritePlaces,
    },
});
