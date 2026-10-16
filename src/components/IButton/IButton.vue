<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
    variant: {
        default: 'primary',
        type: String,
        validator: (value) => {
            return ['primary', 'gradient', 'outlined'].includes(value);
        },
    },
    to: {
        type: [String, Object],
        default: undefined,
    },
    isLoading: {
        default: false,
        type: Boolean,
    },
});

const bgStyles =
    props.variant === 'gradient' ? 'bg-gradient-to-r from-[#FFA279] to-[#F3743D]' : 'bg-[#FFA279]';

const isLink = computed(() => !!props.to);

const componentName = computed(() => {
    return isLink.value ? RouterLink : 'button';
});

const link = computed(() => {
    return isLink.value ? props.to : undefined;
});
</script>

<template>
    <component
        :is="componentName"
        class="bg-[#FFA279] rounded-xl py-3 px-10 text-white font-bold tracking-tighter"
        :class="bgStyles"
        :to="link"
        :disabled="isLink ? undefined : isLoading"
    >
        <template v-if="isLoading">Loading...</template>
        <template v-else><slot></slot></template>
    </component>
</template>
