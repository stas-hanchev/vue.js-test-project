<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import UserIcon from './UserIcon.vue';

const store = useStore();

const user = computed(() => store.state.user.user);
const isLoading = computed(() => store.state.user.isLoading);

onMounted(() => {
    if (!user.value) {
        store.dispatch('user/fetchUser');
    }
});
</script>

<template>
    <div
        class="flex sticky top-0 items-center text-black gap-3 bg-[#ffe6dc] border-solid border-b-2 border-primary rounded-bl-2xl rounded-br-2xl px-6 py-4 mb-10"
    >
        <div
            class="w-10 h-10 flex items-center justify-center rounded-full color-primary bg-primary"
        >
            <UserIcon class="text-white" />
        </div>
        <span v-if="isLoading">Loading...</span>
        <span v-if="user">{{ user.name }}</span>
    </div>
</template>
