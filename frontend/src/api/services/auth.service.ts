import { getModule } from 'vuex-module-decorators';

import { debounce } from '@shared/helpers/debounce.helpers';
import { LoginDto, LoginSuccessDto, RefreshTokensDto, RefreshTokensSuccessDto, UserDto } from '@shared/dto';
import { api } from '../api.helper';
import AuthVuexModule from '@src/pages/auth/auth.vuex-module';
import { getFingerprint } from '@shared-frontend/helpers/fingerprint.helper';
const authVuexModule = getModule(AuthVuexModule);

const endpoint = 'auth';

class AuthApi {
  static async login(loginDto: LoginDto): Promise<LoginSuccessDto> {
    return await api.post(`${endpoint}/login`, loginDto);
  }

  static async getCurrentUser(): Promise<UserDto> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // TODO: REPLACE WITH ACTUAL API CALL!
        resolve({} as UserDto);
      }, 1000);
    });
  }

  // `${API_URL}/auth/refresh-tokens`
  static async refreshTokens(refreshTokensDto: RefreshTokensDto): Promise<RefreshTokensSuccessDto> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // TODO: REPLACE WITH ACTUAL API CALL!
        resolve({} as RefreshTokensSuccessDto);
      }, 1000);
    });
  }
}

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

  updateAccessTokenExpireDate(expireDate: Date): void {
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

  async login({ email, password }: { email: string; password: string }): Promise<LoginSuccessDto> {
    const fingerprint = await getFingerprint();
    const loginDto = new LoginDto({ email, password, fingerprint });
    return await AuthApi.login(loginDto);
  }

  async getCurrentUser(): Promise<UserDto> {
    return await AuthApi.getCurrentUser();
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
    authVuexModule.updateAccessTokenExpireDate(null);
    this.refreshTokenService.updateIsRefreshTokenExist(false);
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

export { authService };
