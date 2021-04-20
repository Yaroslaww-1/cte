import { createApp } from 'vue';
import store from './vuex/store';
import App from './App.vue';
import router from './router/router';

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
