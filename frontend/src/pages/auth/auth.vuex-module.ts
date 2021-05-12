import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
// import axios from 'axios';

import { UserDto } from '@shared/dto';
import { getFingerprint } from '@src/shared-frontend/helpers/fingerprint.helper';
import { UserApi } from '@src/api/services/user/user.api';
import { refreshTokenService } from '@src/api/services/auth/refresh-token.service';
import { parseAccessTokenPayload } from '@src/shared-frontend/helpers/auth.helper';
import { AuthApi } from '@api/auth/auth.api';
import { Route } from '@src/router/routes.enum';
import {
  ConfirmEmailRequest,
  CreateUserRequest,
  LoginRequest,
  LoginSuccessResponse,
  RefreshTokensRequest,
  RefreshTokensSuccessResponse,
} from '@shared/request-response';
import { redirectTo } from '@src/router/helpers';

@Module({ namespaced: true, name: 'auth' })
class AuthVuexModule extends VuexModule {
  currentUser: UserDto | null = { id: '1', name: 'artemkarimov', email: 'artem@gmail.com' };
  accessToken: string | null = null;
  accessTokenExpireDate: Date | null = null;
  // refreshTokenId: string | null = null;

  get isAccessTokenExpired(): boolean {
    if (this.accessTokenExpireDate) {
      const accessTokenExpDate = this.accessTokenExpireDate.getTime() - 10;
      const nowTime = new Date().getTime();

      return accessTokenExpDate <= nowTime;
    } else {
      return true;
    }
  }

  get bearer(): string {
    return `BEARER ${this.accessToken}`;
  }

  @Mutation
  updateCurrentUser(user: UserDto | null): void {
    this.currentUser = user;
  }

  @Mutation
  updateAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }

  @Mutation
  updateAccessTokenExpireDate(accessTokenExpireDate: Date | null): void {
    this.accessTokenExpireDate = accessTokenExpireDate;
  }

  @Mutation
  updateAuthData(loginResponse: LoginSuccessResponse): void {
    const { accessToken } = loginResponse;
    this.accessToken = accessToken;

    const { expiresInMs } = parseAccessTokenPayload(accessToken);
    this.accessTokenExpireDate = new Date(expiresInMs);
    refreshTokenService.updateIsRefreshTokenExist(true);
  }

  @Mutation
  resetAuthData(): void {
    this.currentUser = null;
    this.accessToken = null;
    this.accessTokenExpireDate = null;
    refreshTokenService.updateIsRefreshTokenExist(false);
  }

  @Action({ rawError: true })
  async login({ email, password }: { email: string; password: string }): Promise<void> {
    const fingerprint = await getFingerprint();
    const loginDto = await LoginRequest.new(LoginRequest, { email, password, fingerprint });
    const loginResponse = await AuthApi.login(loginDto);

    this.updateAuthData(loginResponse);
  }

  @Action({ rawError: true })
  async logout(): Promise<void> {
    await AuthApi.logout();
    this.resetAuthData();
    redirectTo(Route.Login);
  }

  @Action({ rawError: true })
  async register(createUserRequest: CreateUserRequest): Promise<void> {
    await UserApi.createUser(createUserRequest);
    redirectTo(Route.Login);
  }

  @Action({ rawError: true })
  async refreshTokens(): Promise<RefreshTokensSuccessResponse | undefined> {
    try {
      const fingerprint = await getFingerprint();

      const response = await AuthApi.refreshTokens(
        await RefreshTokensRequest.new(RefreshTokensRequest, { fingerprint }),
      );

      this.updateAuthData(response);

      return response;
    } catch (error) {
      console.error(error);
      this.resetAuthData();
      redirectTo(Route.Login);
    }
  }

  @Action({ rawError: true })
  async confirmEmail(confirmEmailRequest: ConfirmEmailRequest): Promise<void> {
    const emailConfirmResponse = await UserApi.confirmEmail(confirmEmailRequest);
    // TODO: show notification with {emailConfirmResponse.message}
    redirectTo(Route.Login);
  }

  @Action({ rawError: true })
  async fetchCurrentUser(): Promise<void> {
    const currentUser = await UserApi.getCurrentUser();
    this.updateCurrentUser(currentUser);
  }
}

export { AuthVuexModule };
