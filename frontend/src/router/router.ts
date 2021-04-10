import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { parseUrlParams, stringifyParams } from '@shared/helpers/querystring.helpers';
import LoginPage from '@pages/auth/login.page.vue';
import RegisterPage from '@pages/auth/register.page.vue';
import ConfirmEmailPage from '@pages/auth/confirm-email.page.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/register',
    component: RegisterPage,
  },
  {
    path: '/confirm-email',
    component: ConfirmEmailPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  parseQuery: parseUrlParams,
  stringifyQuery: stringifyParams,
});

export default router;
