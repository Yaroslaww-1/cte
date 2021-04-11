import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

import {
  CreateUserDto,
  EmailConfirmDto,
  LoginDto,
  LoginSuccessDto,
  RefreshTokensDto,
  RefreshTokensSuccessDto,
  UserDto,
} from '@shared/dto';
import { AuthApi } from '@src/api/services/auth/auth.api';
import { getFingerprint } from '@src/shared-frontend/helpers/fingerprint.helper';
import { UserApi } from '@src/api/services/user/user.api';
import { refreshTokenService } from '@src/api/services/auth/refresh-token.service';
import { parseAccessTokenPayload } from '@src/shared-frontend/helpers/auth.helper';
import router from '@src/router/router';
import { Route } from '@src/router/routes.enum';

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

      console.log(accessTokenExpDate, nowTime);

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
  updateAuthData(loginResponse: LoginSuccessDto): void {
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
    const loginDto = new LoginDto({ email, password, fingerprint });
    const loginResponse = await AuthApi.login(loginDto);

    this.updateAuthData(loginResponse);
    // this.updateRefreshTokenId(loginResponse.refreshTokenId);
  }

  // @Action({ rawError: true })
  // logout(): void {
  //   this.updateCurrentUser(null);
  //   refreshTokenService.updateIsRefreshTokenExist(false);
  //   this.updateAccessTokenExpireDate(null);
  //   this.updateAccessToken('');
  // }

  @Action({ rawError: true })
  async register(createUserDto: CreateUserDto): Promise<void> {
    const newUser = await UserApi.createUser(createUserDto);
    // TODO: redirect to login
  }

  @Action({ rawError: true })
  async refreshTokens(): Promise<RefreshTokensSuccessDto | undefined> {
    try {
      const fingerprint = await getFingerprint();
      const response = await AuthApi.refreshTokens(new RefreshTokensDto({ fingerprint }));

      this.updateAuthData(response);

      return response;
    } catch (error) {
      console.error(error);
      this.resetAuthData();
      router.push({ name: Route.Login });
    }
  }

  @Action({ rawError: true })
  async confirmEmail(emailConfirmDto: EmailConfirmDto): Promise<void> {
    const emailConfirmResponse = await UserApi.confirmEmail(emailConfirmDto);
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
