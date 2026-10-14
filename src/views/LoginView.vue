<script setup>
import { useRouter } from 'vue-router';
import { useMutation } from '@/composables/useMutation';

import LoginForm from '@/components/Auth/Login/LoginForm.vue';
import { login } from '@/api/user';

const router = useRouter();

const {
    isLoading,
    error,
    mutation: handleLogin,
} = useMutation({
    mutationFn: login,
    onSuccess: () => router.replace('/map'),
});
</script>

<template>
    <LoginForm @submit="handleLogin" :is-loading="isLoading" />
    <div v-if="error" class="text-red-500">{{ error.response?.data?.message ?? error.message }}</div>
</template>
