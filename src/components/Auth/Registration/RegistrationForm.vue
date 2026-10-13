<script setup>
import { reactive, toRaw } from 'vue';

import FormContainer from '../FormContainer.vue';
import IInput from '@/components/IInput/IInput.vue';
import IButton from '@/components/IButton/IButton.vue';

const emit = defineEmits(['submit']);
const userData = reactive({
    name: '',
    email: '',
    password: '',
});
</script>

<template>
    <FormContainer
        @submit.prevent="emit('submit', toRaw(userData))"
        class="max-w-125 w-full bg-white p-10 rounded-2xl"
    >
        <IInput class="mb-4" label="Повне ім'я" v-model="userData.name"></IInput>
        <IInput class="mb-4" label="Електронна пошта" v-model="userData.email"></IInput>
        <IInput label="Пароль" type="password" v-model="userData.password"></IInput>
        <IButton class="mt-5 w-full" variant="gradient" type="submit">Створити акаунт</IButton>
    </FormContainer>
</template>
