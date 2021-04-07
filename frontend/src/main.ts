import { createApp } from 'vue';
import store from './vuex/store';
import App from './App.vue';
import router from './router/router';

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
