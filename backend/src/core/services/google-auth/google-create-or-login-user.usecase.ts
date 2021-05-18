import { Injectable } from '@nestjs/common';
import { UserMapper } from '../user/user.mapper';
import { UserDao } from '@src/data/dao/user/user.dao';
import { GoogleUserRequest } from '@shared/request-response/user/google-create-user.request';
import { UserEntity } from '../user/entities/user.entity';
import { BaseEntity } from '@src/core/abstraction/base-entity';
import { RefreshSessionService } from '../auth/services/refresh-session.service';
import { AccessTokenService } from '../auth/services/access-token.service';
import { REFRESH_TOKEN_LIFETIME_IN_SECONDS } from '../auth/constants';
import { NotFoundException } from '@src/core/exceptions/not-found.exception';
import { RefreshSessionEntity } from '../auth/entities/refresh-session.entity';
import { LoginSuccessDto } from '../auth/dto/login-success.dto';

@Injectable()
export class GoogleCreateOrLoginUserUsecase {
  constructor(
    private readonly userDao: UserDao,
    private readonly userMapper: UserMapper,
    private readonly refreshSessionService: RefreshSessionService,
    private readonly accessTokenService: AccessTokenService,
  ) {}
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(request: any, googleUserRequest: GoogleUserRequest): Promise<LoginSuccessDto> {
    let userModel = await this.userDao.findOne({ email: googleUserRequest.email });
    if (!userModel) {
      const user = await BaseEntity.new(UserEntity, {
        name: googleUserRequest.name,
        email: googleUserRequest.email,
      });
      await this.userDao.createOne(user);
    }

    const refTokenExpiresInMilliseconds = new Date().getTime() + REFRESH_TOKEN_LIFETIME_IN_SECONDS * 1000;
    const refTokenExpiresInSeconds = refTokenExpiresInMilliseconds / 1000;

    userModel = await this.userDao.findOne({ email: googleUserRequest.email });
    if (!userModel) {
      throw new NotFoundException('user');
    }
    const user = await UserEntity.new(UserEntity, userModel);

    const newRefreshSession = await RefreshSessionEntity.newWithoutRefreshTokenId({
      userId: user.id,
      ip: request.ip,
      fingerprint: 'google-fingerprint',
      expiresInMs: refTokenExpiresInMilliseconds,
    });
    await this.refreshSessionService.createRefreshSession(newRefreshSession);

    const accessToken = await this.accessTokenService.makeAccessToken(user);
    const refreshTokenId = newRefreshSession.refreshTokenId;

    return await LoginSuccessDto.new(LoginSuccessDto, {
      accessToken,
      refreshTokenId,
      refTokenExpiresInSeconds,
    });
  }
}
