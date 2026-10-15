<script setup>
import { useRouter } from 'vue-router';
import { useMutation } from '@/composables/useMutation';

import RegistrationForm from '@/components/Auth/Registration/RegistrationForm.vue';
import { authService } from '@/api/authService';

const router = useRouter();

const {
    isLoading,
    error,
    mutation: handleRegisterUser,
} = useMutation({
    mutationFn: (data) => authService.registerUser(data),
    onSuccess: () => router.replace('/map'),
});
</script>

<template>
    <RegistrationForm @submit="handleRegisterUser" :is-loading="isLoading" />
    <div v-if="error" class="text-red-500">
        {{ error.response?.data?.message ?? error.message }}
    </div>
</template>
