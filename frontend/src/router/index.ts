import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '@components/home.vue';
import Login from '@pages/auth/Login.vue';
import Register from '@pages/auth/Register.vue';
import DocumentsList from '@pages/documents/DocumentsList.vue';
import TheDocument from '@pages/documents/TheDocument.vue';
import store from '@pages/auth/vuex/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: Login,
    meta: { requiresUnauth: true }
  },
  {
    path: '/register',
    component: Register,
    meta: { requiresUnauth: true }
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/documents',
    component: DocumentsList,
    meta: { requiresAuth: true },
  },
  {
    path: '/documents/:id',
    component: TheDocument,
    props: true,
    meta: { requiresAuth: true },
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

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/home');
  } else {
    next();
  }
});

export default router;
