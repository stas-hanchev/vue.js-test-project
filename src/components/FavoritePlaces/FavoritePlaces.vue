<script setup>
import { useModal } from '@/composables/useModal.js';

import FavoritePlace from '@/components/FavoritePlace/FavoritePlace.vue';
import EditPlaceModal from '@/components/EditPlaceModal/EditPlaceModal.vue';
import IButton from '@/components/IButton/IButton.vue';
import { computed, ref } from 'vue';
import { useMutation } from '@/composables/useMutation';
import { updateFavoritePlace } from '@/api/favorite-places';

const props = defineProps({
    items: {
        required: true,
        type: Array,
    },
    activeId: {
        required: true,
        type: [String, null],
    },
});

const emit = defineEmits(['place-clicked', 'create', 'updated']);

const { isOpen: isEditOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();
const { mutation: updatePlace, isLoading } = useMutation({
    mutationFn: (formData) => updateFavoritePlace(formData),
    onSuccess: () => {
        closeEditModal();
        emit('updated');
    },
});

const selectedId = ref(null);

const selectedItem = computed(() => props.items.find((place) => place.id === selectedId.value));

const handleEditPlace = (id) => {
    selectedId.value = id;
    openEditModal();
};

const handleSubmit = (formData) => {
    updatePlace(formData);
};
</script>

<template>
    <div class="px-6">
        <div class="text-gray mb-4">Додані маркери</div>
        <slot name="label"></slot>
        <slot name="list">
            <div v-if="props.items.length === 0" class="px-6 text-black">Список порожній</div>
            <FavoritePlace
                v-for="place in props.items"
                :key="place.id"
                :title="place.title"
                :description="place.description"
                :img="place.img"
                :is-active="place.id === props.activeId"
                @click="emit('place-clicked', place.id)"
                @edit="handleEditPlace(place.id)"
            />
        </slot>
        <EditPlaceModal
            :is-open="isEditOpen"
            :place="selectedItem"
            :is-loading="isLoading"
            @submit="handleSubmit"
            @close="closeEditModal"
        />
        <slot></slot>
        <IButton class="w-full mt-10" variant="gradient" @click="emit('create')">
            Додати маркер
        </IButton>
    </div>
</template>
