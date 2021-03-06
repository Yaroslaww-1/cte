import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { parseUrlParams, stringifyParams } from '@shared/helpers/querystring.helpers';
import { Route } from './routes.enum';
import { initCurrentUserStateMiddleware, checkAccessMiddleware } from './middlewares';
import LoginPage from '@pages/auth/login.page.vue';
import RegisterPage from '@pages/auth/register.page.vue';
import ConfirmEmailPage from '@pages/auth/confirm-email.page.vue';
import DocumentsPage from '@pages/documents/documents.page.vue';
import DocumentEditPage from '@pages/document-edit/document-edit.page.vue';
import NotFoundPage from '@pages/not-found/NotFoundPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: Route.Base,
    redirect: Route.Documents,
    meta: { isAuth: true },
  },
  {
    path: Route.Login,
    component: LoginPage,
    meta: {},
  },
  {
    path: Route.Register,
    component: RegisterPage,
    meta: {},
  },
  {
    path: Route.ConfirmEmail,
    component: ConfirmEmailPage,
    meta: {},
  },
  {
    path: Route.Documents,
    component: DocumentsPage,
    meta: { isAuth: true },
  },
  {
    path: Route.DocumentEdit,
    component: DocumentEditPage,
    meta: { isAuth: true },
  },
  {
    path: Route.NotFound,
    component: NotFoundPage,
    meta: {},
  },
];

const router = createRouter({
  history: createWebHistory(Route.Base),
  routes,
  parseQuery: parseUrlParams,
  stringifyQuery: stringifyParams,
});

router.beforeEach(initCurrentUserStateMiddleware);
router.beforeEach(checkAccessMiddleware);

export default router;
