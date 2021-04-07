// eg. /app/store/posts.ts
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

import { UserDto } from '@shared/dto';
import { authService } from '@src/api/services/auth.service';

@Module({ namespaced: true, name: 'auth' })
export default class AuthVuexModule extends VuexModule {
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

  @Action
  async login({ email, password }: { email: string; password: string }): Promise<void> {
    const loginResponse = await authService.login({ email, password });
    this.context.commit('updateAccessToken', loginResponse.accessToken);
    this.context.commit('updateRefreshTokenId', loginResponse.refreshTokenId);
  }

  @Action
  async fetchCurrentUser(): Promise<void> {
    const currentUser = await authService.getCurrentUser();
    this.context.commit('updateCurrentUser', currentUser);
  }
}
