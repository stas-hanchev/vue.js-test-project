<script setup>
// import HomepageView from '@/views/HomepageView.vue';
// import FavoritePlaces from './components/FavoritePlaces/FavoritePlaces.vue';
import RegistrationForm from './components/Auth/Registration/RegistrationForm.vue';
import LoginForm from './components/Auth/Login/LoginForm.vue';
</script>

<template>
    <!-- <HomepageView /> -->
    <!-- <div class="bg-white h-screen w-100">
        <FavoritePlaces />
    </div> -->
    <RegistrationForm @submit="console.log" />
    <LoginForm @submit="console.log"></LoginForm>
</template>
