<script setup>
import { useModal } from '@/composables/useModal.js';

import FavoritePlace from '@/components/FavoritePlace/FavoritePlace.vue';
import EditPlaceModal from '@/components/EditPlaceModal/EditPlaceModal.vue';
import IButton from '@/components/IButton/IButton.vue';

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

const emit = defineEmits(['place-clicked', 'create']);

const { isOpen: isEditOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();
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
                @edit="openEditModal"
            />
        </slot>
        <EditPlaceModal :is-open="isEditOpen" @close="closeEditModal" />
        <slot></slot>
        <IButton class="w-full mt-10" variant="gradient" @click="emit('create')">
            Додати маркер
        </IButton>
    </div>
</template>
