import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

import { LoginDto, UserDto } from '@shared/dto';
import { AuthApi } from '@src/api/services/auth/auth.api';
import { getFingerprint } from '@src/shared-frontend/helpers/fingerprint.helper';

@Module({ namespaced: true, name: 'auth' })
class AuthVuexModule extends VuexModule {
  currentUser: UserDto | null = null;
  accessToken: string | null = null;
  accessTokenExpireDate: Date | null = null;
  refreshTokenId: string | null = null;

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
  updateRefreshTokenId(refreshTokenId: string): void {
    this.refreshTokenId = refreshTokenId;
  }

  @Action({ rawError: true })
  async login({ email, password }: { email: string; password: string }): Promise<void> {
    const fingerprint = await getFingerprint();
    const loginDto = new LoginDto({ email, password, fingerprint });
    const loginResponse = await AuthApi.login(loginDto);
    this.updateAccessToken(loginResponse.accessToken);
    this.updateRefreshTokenId(loginResponse.refreshTokenId);
  }

  @Action({ rawError: true })
  async fetchCurrentUser(): Promise<void> {
    const currentUser = await AuthApi.getCurrentUser();
    this.updateCurrentUser(currentUser);
  }
}

export { AuthVuexModule };
