/* eslint-disable no-useless-constructor */
import { debounce } from '@shared/helpers/debounce.helpers';
import { LoginDto, RefreshTokensDto, RefreshTokensSuccessDto } from '@shared/dto';
import { getFingerprint } from '@shared-frontend/helpers/fingerprint.helper';
import { AuthApi } from './auth.api';

import { authVuexModule } from '@src/vuex/store-accessor';

class BearerService {
  getBearer(): string {
    const accessToken = authVuexModule.accessToken;
    return `BEARER ${accessToken}`;
  }
}

class AccessTokenService {
  updateAccessToken(accessToken: string): void {
    authVuexModule.updateAccessToken(accessToken);
  }

  updateAccessTokenExpireDate(expireDate: Date | null): void {
    authVuexModule.updateAccessTokenExpireDate(expireDate);
  }

  isAccessTokenExpired(): boolean {
    if (authVuexModule.accessTokenExpireDate) {
      const accessTokenExpDate = authVuexModule.accessTokenExpireDate.getTime() - 10;
      const nowTime = Math.floor(new Date().getTime() / 1000);

      return accessTokenExpDate <= nowTime;
    } else {
      return true;
    }
  }
}

class RefreshTokenService {
  isRefreshTokenExist(): boolean {
    // TODO: refactor
    return localStorage.getItem('isRefreshTokenExist') === 'true';
  }

  updateIsRefreshTokenExist(isRefreshTokenExist: boolean): void {
    localStorage.setItem('isRefreshTokenExist', `${isRefreshTokenExist}`);
  }
}

class AuthService {
  readonly bearerService: BearerService;
  readonly accessTokenService: AccessTokenService;
  readonly refreshTokenService: RefreshTokenService;
  constructor() {
    this.bearerService = new BearerService();
    this.accessTokenService = new AccessTokenService();
    this.refreshTokenService = new RefreshTokenService();
  }

  async login({ email, password }: { email: string; password: string }): Promise<void> {
    const fingerprint = await getFingerprint();
    const loginDto = new LoginDto({ email, password, fingerprint });
    const loginResponse = await AuthApi.login(loginDto);
    authVuexModule.updateAccessToken(loginResponse.accessToken);
    authVuexModule.updateRefreshTokenId(loginResponse.refreshTokenId);
  }

  async refreshTokens(): Promise<RefreshTokensSuccessDto | undefined> {
    try {
      const fingerprint = await getFingerprint();
      const response = await AuthApi.refreshTokens(new RefreshTokensDto({ fingerprint }));

      this.accessTokenService.updateAccessToken(response.accessToken);
      // TODO: possible wrong
      const exp = this.parseTokenData(response.accessToken).exp;
      this.accessTokenService.updateAccessTokenExpireDate(new Date(exp as number));
      return response;
    } catch (error) {
      console.error(error);
      this.resetAuthData();
      // $router.push({ name: 'login' }).catch(() => {});
    }
  }

  private resetAuthData(): void {
    authVuexModule.updateCurrentUser(null);
    this.refreshTokenService.updateIsRefreshTokenExist(false);
    this.accessTokenService.updateAccessTokenExpireDate(null);
    this.accessTokenService.updateAccessToken('');
  }

  debounceRefreshTokens = debounce<RefreshTokensSuccessDto | undefined>(() => {
    return this.refreshTokens();
  }, 100);

  private parseTokenData(accessToken: string): Record<string, unknown> {
    let payload = '';
    let tokenData = {};

    try {
      payload = accessToken.split('.')[1];
      tokenData = JSON.parse(atob(payload));
    } catch (error) {
      throw new Error(error);
    }

    return tokenData;
  }
}

const authService = new AuthService();

export { authService, AuthService };
