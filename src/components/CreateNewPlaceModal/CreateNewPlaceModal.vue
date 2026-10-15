<script setup>
import IButton from '../IButton/IButton.vue';
import IModal from '../IModal/IModal.vue';
import IInput from '../IInput/IInput.vue';
import InputImage from '../InputImage/InputImage.vue';
import MarkerIcon from '../icons/MarkerIcon.vue';
import { reactive, computed } from 'vue';

const props = defineProps({
    isOpen: {
        default: false,
        type: Boolean,
    },
    isLoading: {
        default: false,
        type: Boolean,
    },
    hasError: {
        default: false,
        type: Boolean,
    },
});

const emit = defineEmits(['close', 'submit']);

const formData = reactive({
    title: '',
    description: '',
    img: '',
});

const handleUpload = (url) => {
    formData.img = url;
};

const resetForm = () => {
    formData.title = '';
    formData.description = '';
    formData.img = '';
};

const uploadText = computed(() => {
    return formData.img ? 'Натисніть тут, щоб змінити фото' : 'Натисніть тут, щоб додати фото';
});
</script>

<template>
    <IModal v-if="props.isOpen" @close="emit('close')">
        <form @submit.prevent="emit('submit', formData, resetForm)" class="min-v-105">
            <div class="flex gap-1 justify-center font-bolt text-center mb-8">
                <MarkerIcon /> Додати маркери
            </div>
            <IInput label="Локація" class="mb-4" v-model="formData.title" />
            <IInput type="textarea" label="Опис" class="mb-2" v-model="formData.description" />
            <div class="flex gap-2 mb-10 items-center">
                <img
                    v-if="formData.img"
                    :src="formData.img"
                    alt="avatar"
                    class="w-8 h-8 object-cover"
                />
                {{ uploadText }}
                <InputImage />
            </div>
            <IButton
                class="w-full"
                variant="gradient"
                mb-10
                @uploaded="handleUpload"
                :is-loading="props.isLoading"
            >
                Додати
            </IButton>
            <div v-if="props.hasError" class="text-red-500">Щось пішло не так</div>
        </form>
    </IModal>
</template>
