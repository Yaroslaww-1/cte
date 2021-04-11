import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { parseUrlParams, stringifyParams } from '@shared/helpers/querystring.helpers';
import LoginPage from '@pages/auth/login.page.vue';
import RegisterPage from '@pages/auth/register.page.vue';
import ConfirmEmailPage from '@pages/auth/confirm-email.page.vue';
import DocumentsPage from '@pages/documents/documents.page.vue';
import { Route } from './routes.enum';

const routes: Array<RouteRecordRaw> = [
  {
    path: Route.Login,
    component: LoginPage,
  },
  {
    path: Route.Register,
    component: RegisterPage,
  },
  {
    path: Route.ConfirmEmail,
    component: ConfirmEmailPage,
  },
  {
    path: Route.Documents,
    component: DocumentsPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  parseQuery: parseUrlParams,
  stringifyQuery: stringifyParams,
});

export default router;
