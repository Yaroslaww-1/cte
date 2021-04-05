import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@src/core/exceptions/not-found.exception';
import { RefreshSessionDao } from '@src/data/dao/refresh-session/refresh-session.dao';
import { UserDao } from '@src/data/dao/user/user.dao';
import { REFRESH_TOKEN_EXPIRES_IN_MILLISECONDS } from './constants';
import { RefreshTokensRequest } from './requests/refresh-tokens.request';
import { RefreshSessionEntity } from './entities/refresh-session.entity';
import { AccessTokenService } from './services/access-token.service';
import { RefreshSessionService } from './services/refresh-session.service';
import { RefreshTokensSuccessResponse } from './responses/refresh-tokens-success.response';

@Injectable()
export class RefreshTokensService {
  constructor(
    private readonly refreshSessionDao: RefreshSessionDao,
    private readonly refreshSessionService: RefreshSessionService,
    private readonly userDao: UserDao,
    private readonly accessTokenService: AccessTokenService,
  ) {}

  async refreshTokens(refreshTokensRequest: RefreshTokensRequest): Promise<RefreshTokensSuccessResponse> {
    const { refreshTokenId, fingerprint, ip, userAgent } = refreshTokensRequest;

    const refTokenExpiresInMilliseconds = new Date().getTime() + REFRESH_TOKEN_EXPIRES_IN_MILLISECONDS;
    const refTokenExpiresInSeconds = refTokenExpiresInMilliseconds / 1000;

    const oldRefreshSession = await this.refreshSessionDao.findOne({ refreshTokenId });
    if (oldRefreshSession) {
      await this.refreshSessionDao.deleteAll({ refreshTokenId });
    } else {
      throw new NotFoundException('Refresh session with given refreshToken');
    }

    await this.refreshSessionService.verifyRefreshSession(new RefreshSessionEntity(oldRefreshSession), fingerprint);
    const user = await this.userDao.findOne({ id: oldRefreshSession.userId });

    if (!user) {
      throw new NotFoundException('User with refresh session');
    }

    const newRefreshSession = new RefreshSessionEntity({
      userId: user.id,
      ip,
      userAgent,
      fingerprint,
      expiresIn: refTokenExpiresInMilliseconds,
    });

    await this.refreshSessionService.createRefreshSession(newRefreshSession);

    const accessToken = await this.accessTokenService.makeAccessToken(user);

    return new RefreshTokensSuccessResponse({
      accessToken,
      refreshTokenId: newRefreshSession.refreshTokenId,
      refTokenExpiresInSeconds,
    });
  }
}
