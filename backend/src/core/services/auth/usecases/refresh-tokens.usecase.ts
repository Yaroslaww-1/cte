import { Injectable } from '@nestjs/common';

import { NotFoundException } from '@src/core/exceptions/not-found.exception';
import { RefreshSessionDao } from '@src/data/dao/refresh-session/refresh-session.dao';
import { UserDao } from '@src/data/dao/user/user.dao';
import { REFRESH_TOKEN_EXPIRES_IN_MILLISECONDS } from '../constants';
import { RefreshTokensDto } from '../dto/refresh-tokens.dto';
import { RefreshSessionEntity } from '../entities/refresh-session.entity';
import { AccessTokenService } from '../services/access-token.service';
import { RefreshSessionService } from '../services/refresh-session.service';
import { UserEntity } from '../../user/entities/user.entity';
import { IBaseUsecase } from '@src/core/abstraction/base-usecase.interface';
import { RefreshTokensSuccessDto } from '../dto/refresh-tokens-success.dto';

@Injectable()
class RefreshTokensUsecase implements IBaseUsecase<RefreshTokensDto, RefreshTokensSuccessDto> {
  constructor(
    private readonly refreshSessionDao: RefreshSessionDao,
    private readonly refreshSessionService: RefreshSessionService,
    private readonly userDao: UserDao,
    private readonly accessTokenService: AccessTokenService,
  ) {}

  async execute(refreshTokensRequest: RefreshTokensDto): Promise<RefreshTokensSuccessDto> {
    const { refreshTokenId, fingerprint, ip, userAgent } = refreshTokensRequest;

    const refTokenExpiresInMilliseconds = new Date().getTime() + REFRESH_TOKEN_EXPIRES_IN_MILLISECONDS;
    const refTokenExpiresInSeconds = refTokenExpiresInMilliseconds / 1000;

    const oldRefreshSession = await this.refreshSessionDao.findOne({ refreshTokenId });
    if (oldRefreshSession) {
      await this.refreshSessionDao.deleteAll({ refreshTokenId });
    } else {
      throw new NotFoundException('Refresh session with given refreshToken');
    }

    await oldRefreshSession.verifyFingerprint(fingerprint);

    const userModel = await this.userDao.findOne({ id: oldRefreshSession.userId });
    if (!userModel) {
      throw new NotFoundException('User with refresh session');
    }
    const user = await UserEntity.new(UserEntity, userModel);

    const newRefreshSession = await RefreshSessionEntity.newWithoutRefreshTokenId({
      userId: user.id,
      ip,
      userAgent,
      fingerprint,
      expiresIn: refTokenExpiresInMilliseconds,
    });

    await this.refreshSessionService.createRefreshSession(newRefreshSession);

    const accessToken = await this.accessTokenService.makeAccessToken(user);

    return await RefreshTokensSuccessDto.new(RefreshTokensSuccessDto, {
      accessToken,
      refreshTokenId: newRefreshSession.refreshTokenId,
      refTokenExpiresInSeconds,
    });
  }
}

export { RefreshTokensUsecase };
