import { clientFetch } from '../clientFetch';

const BASE_PLACES_URL = '/points';

export const getFavoritePlaces = async () => {
    return clientFetch.get(BASE_PLACES_URL);
};

export const addFavoritePlace = async (body) => {
    return clientFetch.post(BASE_PLACES_URL, body);
};

export const updateFavoritePlace = async (body) => {
    return clientFetch.put(BASE_PLACES_URL, body);
};

export const deleteFavoritePlaces = async (body) => {
    return clientFetch.delete(BASE_PLACES_URL, body);
};
