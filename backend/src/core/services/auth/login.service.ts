import { Injectable } from '@nestjs/common';
import { InvalidCredentialsException } from '@src/core/exceptions/auth/invalid-credentials.exception';
import { InvalidPasswordException } from '@core/exceptions/auth/invalid-password.exception';
import { NotFoundException } from '@src/core/exceptions/not-found.exception';
import { UserService } from '../user/user.service';
import { REFRESH_TOKEN_EXPIRES_IN_MILLISECONDS } from './constants';
import { LoginRequest } from './requests/login.request';
import { RefreshSessionEntity } from './entities/refresh-session.entity';
import { checkPassword } from './helpers/check-password.helper';
import { AccessTokenService } from './services/access-token.service';
import { RefreshSessionService } from './services/refresh-session.service';
import { LoginSuccessResponse } from './responses/login-success.response';

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UserService,
    private readonly refreshSessionService: RefreshSessionService,
    private readonly accessTokenService: AccessTokenService
  ) {}

  async login(loginRequest: LoginRequest): Promise<LoginSuccessResponse> {
    const refTokenExpiresInMilliseconds = new Date().getTime() + REFRESH_TOKEN_EXPIRES_IN_MILLISECONDS;
    const refTokenExpiresInSeconds = refTokenExpiresInMilliseconds / 1000;

    const user = await this.userService.getUser({ email: loginRequest.email });
    if (!user) {
      throw new NotFoundException('user');
    }

    try {
      await checkPassword(loginRequest.password, user.passwordHash);
    } catch (e) {
      if (e instanceof InvalidPasswordException) {
        throw new InvalidCredentialsException();
      }
      throw e;
    }

    const newRefreshSession = new RefreshSessionEntity({
      userId: user.id,
      ip: loginRequest.ip,
      userAgent: loginRequest.userAgent,
      fingerprint: loginRequest.fingerprint,
      expiresIn: refTokenExpiresInMilliseconds,
    });

    await this.refreshSessionService.createRefreshSession(newRefreshSession);

    const accessToken = await this.accessTokenService.makeAccessToken(user);
    const refreshToken = newRefreshSession.refreshToken;

    return new LoginSuccessResponse({
      accessToken,
      refreshToken,
      refTokenExpiresInSeconds,
    });
  }
}
