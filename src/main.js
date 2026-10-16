import './assets/main.css';

import { createApp } from 'vue';
import { store } from './store';
import { router } from './router';
import { setupInterceptors } from './api/interceptors';

import App from './App.vue';

setupInterceptors(store, router);

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
