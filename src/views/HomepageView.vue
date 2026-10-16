<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useModal } from '@/composables/useModal';
import { useMutation } from '@/composables/useMutation';

import FavoritePlaces from '@/components/FavoritePlaces/FavoritePlaces.vue';
import { mapSettings } from '@/map/settings';
import MarkerIcon from '@/components/icons/MarkerIcon.vue';
import CreateNewPlaceModal from '@/components/CreateNewPlaceModal/CreateNewPlaceModal.vue';
import UserInfo from '@/components/UserInfo/UserInfo.vue';
import LogoutButton from '@/components/LogoutButton/LogoutButton.vue';

const store = useStore();

const map = ref(null);
const mapMarkerLngLat = ref(null);

const favoritePlaces = computed(() => store.state.favoritePlaces.places);
const isPlacesLoading = computed(() => store.state.favoritePlaces.isLoading);

const { isOpen, openModal, closeModal } = useModal();

const {
    mutation: addPlace,
    isLoading: isAddingPlace,
    error: hasAddingPlaceError,
} = useMutation({
    mutationFn: (newPlaceData) => store.dispatch('favoritePlaces/addPlace', newPlaceData),
    onSuccess: () => {
        closeModal();
        mapMarkerLngLat.value = null;
    },
});

const changeActiveId = (id) => {
    store.commit('favoritePlaces/SET_ACTIVE_ID', id);
};

const changePlace = (id) => {
    const { coordinates } = store.getters['favoritePlaces/getPlaceById'](id);
    changeActiveId(id);
    map.value.flyTo({ center: coordinates });
};

const handleMapClick = ({ lngLat }) => {
    mapMarkerLngLat.value = [lngLat.lng, lngLat.lat];
};

const handleAddPlace = async (formData, resetForm) => {
    const body = {
        ...formData,
        coordinates: mapMarkerLngLat.value,
    };

    await addPlace(body);

    if (!hasAddingPlaceError.value) {
        resetForm();
    }
};

onMounted(() => {
    store.dispatch('favoritePlaces/fetchPlaces');
});
</script>

<template>
    <main class="flex h-screen">
        <div class="relative bg-white h-full w-100 shrink-0 overflow-auto pb-10">
            <UserInfo />
            <div v-if="isPlacesLoading" class="text-black px-6">Loading...</div>
            <FavoritePlaces @place-clicked="changePlace" @create="openModal" />
            <LogoutButton class="mt-10" />
            <CreateNewPlaceModal
                :is-open="isOpen"
                :is-loading="isAddingPlace"
                :has-error="hasAddingPlaceError"
                @close="closeModal"
                @submit="handleAddPlace"
            />
        </div>
        <div class="w-full h-full flex items-center justify-center text-6xl">
            <MapboxMap
                class="w-full h-full"
                :center="[30.523333, 50.450001]"
                :zoom="10"
                :access-token="mapSettings.apiToken"
                :map-style="mapSettings.style"
                @mb-click="handleMapClick"
                @mb-created="(mapInstance) => (map = mapInstance)"
            >
                <MapboxMarker v-if="mapMarkerLngLat" :lngLat="mapMarkerLngLat" anchor="bottom">
                    <MarkerIcon class="h-8 w-8" is-active />
                </MapboxMarker>
                <MapboxMarker
                    v-for="place in favoritePlaces"
                    :key="place.id"
                    :lngLat="place.coordinates"
                    anchor="bottom"
                >
                    <button @click.stop="changeActiveId(place.id)">
                        <MarkerIcon class="h-8 w-8" />
                    </button>
                </MapboxMarker>
            </MapboxMap>
        </div>
    </main>
</template>
