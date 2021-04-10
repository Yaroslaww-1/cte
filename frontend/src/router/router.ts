import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import LoginPage from '@pages/auth/login.page.vue';
import RegisterPage from '@pages/auth/register.page.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/register',
    component: RegisterPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
