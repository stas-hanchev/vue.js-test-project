<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useMutation } from '@/composables/useMutation.js';

import LogoutIcon from './LogoutIcon.vue';

const router = useRouter();
const store = useStore();

const { mutation: logoutUser, isLoading } = useMutation({
    mutationFn: () => store.dispatch('auth/logout'),
    onSuccess: () => router.replace('/auth/login'),
});
</script>

<template>
    <button class="flex gap-2 items-center px-6 text-black" @click="logoutUser">
        <span v-if="isLoading">Loading...</span>
        <span v-else>Вихід</span>
        <LogoutIcon />
    </button>
</template>
