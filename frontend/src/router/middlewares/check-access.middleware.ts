import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import { authVuexModule } from '@src/vuex/store-accessor';
import { Route } from '../routes.enum';

const checkAccessMiddleware = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
): Promise<void> => {
  const currentUserId = authVuexModule.currentUser?.id;
  const isAuthRoute = to.matched.some(item => item.meta?.isAuth);

  if (isAuthRoute && currentUserId) {
    next();
    return;
  }
  if (isAuthRoute) {
    next({ path: Route.Login });
    return;
  }

  next();
};

export { checkAccessMiddleware };
