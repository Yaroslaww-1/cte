import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import UserAuth from '../components/UserAuth.vue';
import TheHome from '../components/TheHome.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    component: UserAuth,
  },
  {
    path: '/home',
    component: TheHome,
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