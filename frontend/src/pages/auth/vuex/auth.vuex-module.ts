// eg. /app/store/posts.ts
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

import { LoginDto, UserDto } from '@shared/dto';
import { AuthService } from '@src/api/services/auth.service';

@Module
export default class AuthModule extends VuexModule {
  currentUser: UserDto | null = null;
  accessToken: string | null = null;
  refreshTokenId: string | null = null;

  @Mutation
  setCurrentUser(user: UserDto): void {
    this.currentUser = user;
  }

  @Mutation
  updateAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
  }

  @Mutation
  updateRefreshTokenId(refreshTokenId: string): void {
    this.refreshTokenId = refreshTokenId;
  }

  @Action
  async login(loginDto: LoginDto): Promise<void> {
    const loginResponse = await AuthService.login(loginDto);
    this.context.commit('updateAccessToken', loginResponse.accessToken);
    this.context.commit('updateRefreshTokenId', loginResponse.refreshTokenId);
  }

  @Action
  async fetchCurrentUser(): Promise<void> {
    const currentUser = await AuthService.getCurrentUser();
    this.context.commit('setCurrentUser', currentUser);
  }
}
