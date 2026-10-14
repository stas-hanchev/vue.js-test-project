import { ref } from 'vue';

export const useMutation = ({ mutationFn, onSuccess, onError }) => {
    const data = ref();
    const isLoading = ref(false);
    const error = ref(null);

    const mutation = async (...args) => {
        if (isLoading.value) return;

        isLoading.value = true;
        error.value = null;
        try {
            data.value = await mutationFn(...args);
            onSuccess?.(data.value);
        } catch (err) {
            error.value = err;
            onError?.(err);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        data,
        isLoading,
        error,
        mutation,
    };
};
