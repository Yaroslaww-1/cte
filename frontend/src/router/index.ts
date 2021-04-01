import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import UserAuth from '@pages/auth/UserAuth.vue';
import Home from '@components/home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    component: UserAuth,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/',
    redirect: '/home',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
