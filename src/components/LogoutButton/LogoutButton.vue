<script setup>
import { useRouter } from 'vue-router';
import { useMutation } from '@/composables/useMutation.js';

import { authService } from '@/api/authService/index.js';
import { logout } from '@/api/user/index.js';
import LogoutIcon from './LogoutIcon.vue';

const router = useRouter();

const { mutation: logoutUser, isLoading } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
        authService.clearToken();
        router.replace('/auth/login');
    },
});
</script>

<template>
    <button class="flex gap-2 items-center px-6 text-black" @click="logoutUser">
        <span v-if="isLoading">Loading...</span>
        <span v-else>Вихід</span>
        <LogoutIcon />
    </button>
</template>
