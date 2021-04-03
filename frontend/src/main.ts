import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './vuex/store';
import PriveVue from 'primevue/config';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(PriveVue);

app.mount('#app');
