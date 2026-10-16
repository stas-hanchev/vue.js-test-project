<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useMutation } from '@/composables/useMutation';

import RegistrationForm from '@/components/Auth/Registration/RegistrationForm.vue';

const router = useRouter();
const store = useStore();

const {
    isLoading,
    error,
    mutation: handleRegisterUser,
} = useMutation({
    mutationFn: (data) => store.dispatch('auth/register', data),
    onSuccess: () => router.replace('/map'),
});
</script>

<template>
    <RegistrationForm @submit="handleRegisterUser" :is-loading="isLoading" />
    <div v-if="error" class="text-red-500">
        {{ error.response?.data?.message ?? error.message }}
    </div>
</template>
