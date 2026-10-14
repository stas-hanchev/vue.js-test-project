<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import RegistrationForm from '@/components/Auth/Registration/RegistrationForm.vue';
import { registerUser } from '@/api/user';

const router = useRouter();
const isLoading = ref(false);

const handleRegisterUser = async (userData) => {
    isLoading.value = true;
    try {
        await registerUser(userData);
        router.replace('/map');
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <RegistrationForm @submit="handleRegisterUser" :is-loading="isLoading" />
</template>
