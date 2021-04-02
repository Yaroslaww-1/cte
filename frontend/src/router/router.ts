import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import LoginPage from '@pages/auth/login-page.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
