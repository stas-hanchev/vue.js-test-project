<script setup>
import IButton from '../IButton/IButton.vue';
import IModal from '../IModal/IModal.vue';

defineProps({
    title: {
        type: String,
        default: '',
    },
    isOpen: {
        type: Boolean,
        default: false,
    },
    isLoading: {
        type: Boolean,
        defaulte: false,
    },
    hasError: {
        type: Boolean,
        defaulte: false,
    },
});

const emit = defineEmits(['cancel', 'confirm']);
</script>

<template>
    <IModal v-if="isOpen" @close="emit('cancel')">
        <div class="mb-4 text-lg">{{ title }}</div>
        <div class="flex gap-3 justify-center">
            <IButton @click="emit('cancel')" variant="gradient">Відхилити</IButton>
            <IButton @click="emit('confirm')" variant="gradient" :is-loading="isLoading">
                Підтвердити
            </IButton>
        </div>
        <div v-if="hasError" class="text-red-500">Щось пішло не так</div>
    </IModal>
</template>
