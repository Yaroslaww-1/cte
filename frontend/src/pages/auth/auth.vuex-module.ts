import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
// import axios from 'axios';

import { UserDto } from '@shared/dto';
import { getFingerprint } from '@src/shared-frontend/helpers/fingerprint.helper';
import { UserApi } from '@src/api/services/user/user.api';
import { refreshTokenService } from '@src/api/services/auth/refresh-token.service';
import { parseAccessTokenPayload } from '@src/shared-frontend/helpers/auth.helper';
import router from '@src/router/router';
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

// const API_URL = process.env.VUE_APP_API_URL;

@Module({ namespaced: true, name: 'auth' })
class AuthVuexModule extends VuexModule {
  currentUser: UserDto | null = null;
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

    const { expiresIn } = parseAccessTokenPayload(accessToken);
    this.accessTokenExpireDate = new Date(expiresIn);
    refreshTokenService.updateIsRefreshTokenExist(true);
  }

  @Mutation
  resetAuthData(): void {
    this.currentUser = null;
    this.accessToken = null;
    this.accessTokenExpireDate = null;
    refreshTokenService.updateIsRefreshTokenExist(false);
  }

  // @Mutation
  // updateRefreshTokenId(refreshTokenId: string): void {
  //   this.refreshTokenId = refreshTokenId;
  // }

  @Action({ rawError: true })
  async login({ email, password }: { email: string; password: string }): Promise<void> {
    const fingerprint = await getFingerprint();
    const loginDto = await LoginRequest.new(LoginRequest, { email, password, fingerprint });
    // const { data: loginResponse } = await axios.post<LoginSuccessDto>(`${API_URL}/auth/login`, loginDto, {
    //   withCredentials: true,
    // });
    const loginResponse = await AuthApi.login(loginDto);

    this.updateAuthData(loginResponse);
    // this.updateRefreshTokenId(loginResponse.refreshTokenId);
  }

  @Action({ rawError: true })
  async logout(): Promise<void> {
    await AuthApi.logout();
    this.resetAuthData();
    router.push({ name: Route.Login });
  }

  @Action({ rawError: true })
  async register(createUserRequest: CreateUserRequest): Promise<void> {
    const newUser = await UserApi.createUser(createUserRequest);
    // TODO: redirect to login
  }

  @Action({ rawError: true })
  async refreshTokens(): Promise<RefreshTokensSuccessResponse | undefined> {
    try {
      const fingerprint = await getFingerprint();
      // const { data: response } = await axios.post<RefreshTokensSuccessDto>(
      //   `${API_URL}/auth/refresh-tokens`,
      //   new RefreshTokensDto({ fingerprint }),
      //   { withCredentials: true },
      // );
      const response = await AuthApi.refreshTokens(
        await RefreshTokensRequest.new(RefreshTokensRequest, { fingerprint }),
      );

      this.updateAuthData(response);

      return response;
    } catch (error) {
      console.error(error);
      this.resetAuthData();
      router.push({ name: Route.Login });
    }
  }

  @Action({ rawError: true })
  async confirmEmail(confirmEmailRequest: ConfirmEmailRequest): Promise<void> {
    const emailConfirmResponse = await UserApi.confirmEmail(confirmEmailRequest);
    // TODO: show notification with {emailConfirmResponse.message}
    // TODO: redirect to login
  }

  @Action({ rawError: true })
  async fetchCurrentUser(): Promise<void> {
    const currentUser = await UserApi.getCurrentUser();
    this.updateCurrentUser(currentUser);
  }
}

export { AuthVuexModule };
