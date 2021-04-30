import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import { refreshTokenService } from '@src/api/services/auth/refresh-token.service';
import { authVuexModule } from '@src/vuex/store-accessor';
import { debounceRefreshTokens } from '@shared-frontend/helpers/auth.helper';

const initCurrentUserStateMiddleware = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
): Promise<void> => {
  const currentUserId = authVuexModule.currentUser?.id;

  if (refreshTokenService.isRefreshTokenExist() && !currentUserId) {
    try {
      await debounceRefreshTokens();
      await authVuexModule.fetchCurrentUser();
      next();
    } catch (e) {
      console.error(e);
      next(false);
    }
  } else {
    next();
  }
};

export { initCurrentUserStateMiddleware };
