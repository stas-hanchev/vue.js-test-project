<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import LoginForm from '@/components/Auth/Login/LoginForm.vue';
import { login } from '@/api/user';

const isLoading = ref(false);
const router = useRouter();

const handleLogin = async (userData) => {
    isLoading.value = true;
    try {
        await login(userData);
        router.replace('/map');
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <LoginForm @submit="handleLogin" :is-loading="isLoading" />
</template>
