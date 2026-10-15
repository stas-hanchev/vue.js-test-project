<script setup>
import { useModal } from '@/composables/useModal.js';

import FavoritePlace from '@/components/FavoritePlace/FavoritePlace.vue';
import EditPlaceModal from '@/components/EditPlaceModal/EditPlaceModal.vue';
import IButton from '@/components/IButton/IButton.vue';
import { computed, ref } from 'vue';
import { useMutation } from '@/composables/useMutation';
import { deleteFavoritePlace, updateFavoritePlace } from '@/api/favorite-places';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal.vue';

const props = defineProps({
    items: {
        required: true,
        type: Array,
    },
    activeId: {
        required: true,
        type: [String, null],
    },
    isLoading: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['place-clicked', 'create', 'updated']);

const {
    isOpen: isEditModalOpen,
    openModal: openEditModal,
    closeModal: closeEditModal,
} = useModal();
const {
    isOpen: isConfirmationModalOpen,
    openModal: openConfirmationModal,
    closeModal: closeConfirmationModal,
} = useModal();

const { mutation: updatePlace, isLoading: isUpdating } = useMutation({
    mutationFn: (formData) => updateFavoritePlace(formData),
    onSuccess: () => {
        closeEditModal();
        emit('updated');
    },
});

const idOfDeletedItem = ref(null);

const {
    mutation: deletePlace,
    isLoading: isDeleting,
    error: deleteError,
} = useMutation({
    mutationFn: () => deleteFavoritePlace(idOfDeletedItem.value),
    onSuccess: () => {
        closeConfirmationModal();
        idOfDeletedItem.value = null;
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

const handleOpenConfirmationModal = (id) => {
    idOfDeletedItem.value = id;
    openConfirmationModal();
};

const handleDeletePlace = () => {
    deletePlace(idOfDeletedItem);
};
</script>

<template>
    <div class="px-6">
        <div class="text-gray mb-4">Додані маркери</div>
        <slot name="label"></slot>
        <slot name="list">
            <div v-if="props.items.length === 0 && !isLoading" class="px-6 text-black">
                Список порожній
            </div>
            <FavoritePlace
                v-for="place in props.items"
                :key="place.id"
                :title="place.title"
                :description="place.description"
                :img="place.img"
                :is-active="place.id === props.activeId"
                @click="emit('place-clicked', place.id)"
                @edit="handleEditPlace(place.id)"
                @delete="handleOpenConfirmationModal(place.id)"
            />

            <EditPlaceModal
                :is-open="isEditModalOpen"
                :place="selectedItem"
                :is-loading="isUpdating"
                @submit="handleSubmit"
                @close="closeEditModal"
            />

            <ConfirmationModal
                :is-open="isConfirmationModalOpen"
                :is-loading="isDeleting"
                :has-error="deleteError"
                @cancel="closeConfirmationModal"
                @confirm="handleDeletePlace"
                title="Ви дійсно хочете видалити улюблене місце?"
            />
        </slot>
        <slot></slot>
        <IButton class="w-full mt-10" variant="gradient" @click="emit('create')">
            Додати маркер
        </IButton>
    </div>
</template>
