<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useMutation } from '@/composables/useMutation';

import LoginForm from '@/components/Auth/Login/LoginForm.vue';

const router = useRouter();
const store = useStore();

const {
    isLoading,
    error,
    mutation: handleLogin,
} = useMutation({
    mutationFn: (data) => store.dispatch('auth/login', data),
    onSuccess: () => router.replace('/map'),
});
</script>

<template>
    <LoginForm @submit="handleLogin" :is-loading="isLoading" />
    <div v-if="error" class="text-red-500">
        {{ error.response?.data?.message ?? error.message }}
    </div>
</template>
