<script setup>
import { ref } from 'vue';
// import HomepageView from '@/views/HomepageView.vue';
// import FavoritePlaces from './components/FavoritePlaces/FavoritePlaces.vue';
import IModal from './components/Auth/IModal/IModal.vue';
import RegistrationForm from './components/Auth/Registration/RegistrationForm.vue';
import LoginForm from './components/Auth/Login/LoginForm.vue';

const isOpen = ref(false);

const closeModal = () => {
    isOpen.value = false;
};

const openModal = () => {
    isOpen.value = true;
};
</script>

<template>
    <!-- <HomepageView /> -->
    <!-- <div class="bg-white h-screen w-100">
        <FavoritePlaces />
    </div> -->
    <button @click="openModal">Click me</button>
    <RegistrationForm @submit="console.log" />
    <LoginForm @submit="console.log"></LoginForm>
    <IModal v-if="isOpen" @close="closeModal"></IModal>
</template>
