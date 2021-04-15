import { Injectable } from '@nestjs/common';

import { NotFoundException } from '@src/core/exceptions/not-found.exception';
import { REFRESH_TOKEN_EXPIRES_IN_MILLISECONDS } from '../constants';
import { RefreshSessionEntity } from '../entities/refresh-session.entity';
import { AccessTokenService } from '../services/access-token.service';
import { UserDao } from '@src/data/dao/user/user.dao';
import { LoginDto } from '../dto/login.dto';
import { LoginSuccessDto } from '../dto/login-success.dto';
import { UserEntity } from '../../user/entities/user.entity';
import { IBaseUsecase } from '@src/core/abstraction/base-usecase.interface';
import { RefreshSessionService } from '../services/refresh-session.service';

@Injectable()
class LoginUsecase implements IBaseUsecase<LoginDto, LoginSuccessDto> {
  constructor(
    private readonly userDao: UserDao,
    private readonly refreshSessionService: RefreshSessionService,
    private readonly accessTokenService: AccessTokenService,
  ) {}

  async execute(loginDto: LoginDto): Promise<LoginSuccessDto> {
    const refTokenExpiresInMilliseconds = new Date().getTime() + REFRESH_TOKEN_EXPIRES_IN_MILLISECONDS;
    const refTokenExpiresInSeconds = refTokenExpiresInMilliseconds / 1000;

    const userModel = await this.userDao.findOne({ email: loginDto.email });
    if (!userModel) {
      throw new NotFoundException('user');
    }

    const user = await UserEntity.new(UserEntity, userModel);

    await user.isPasswordEqual(loginDto.password);

    const newRefreshSession = await RefreshSessionEntity.newWithoutRefreshTokenId({
      userId: user.id,
      ip: loginDto.ip,
      userAgent: loginDto.userAgent,
      fingerprint: loginDto.fingerprint,
      expiresIn: refTokenExpiresInMilliseconds,
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

export { LoginUsecase };
