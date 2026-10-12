<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    variant: {
        default: 'primary',
        //required: true,
        type: String,
        validator: (value) => {
            return ['primary', 'gradient', 'outlined'].includes(value);
        },
    },
});

const bgStyles =
    props.variant === 'gradient' ? 'bg-gradient-to-r from-[#FFA279] to-[#F3743D]' : 'bg-[#FFA279]';
</script>

<template>
    <button
        class="bg-[#FFA279] rounded-xl py-3 px-10 text-white font-bold tracking-tighter"
        :class="bgStyles"
    >
        <slot></slot>
    </button>
</template>
