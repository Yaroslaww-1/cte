import { BadRequestException, Injectable } from '@nestjs/common';

import { InvalidCredentialsException } from '@src/core/exceptions/auth/invalid-credentials.exception';
import { InvalidPasswordException } from '@core/exceptions/auth/invalid-password.exception';
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

    try {
      await user.isPasswordEqual(loginDto.password);
    } catch (e) {
      if (e instanceof InvalidPasswordException) {
        throw new InvalidCredentialsException();
      } else {
        throw e;
      }
    }

    console.log(refTokenExpiresInMilliseconds, typeof refTokenExpiresInMilliseconds);

    try {
      const newRefreshSession = await RefreshSessionEntity.newWithoutRefreshTokenId({
        userId: user.id,
        ip: loginDto.ip,
        userAgent: loginDto.userAgent,
        fingerprint: loginDto.fingerprint,
        expiresIn: refTokenExpiresInMilliseconds,
      });
      console.log('c');
      await this.refreshSessionService.createRefreshSession(newRefreshSession);
      console.log('cc');

      const accessToken = await this.accessTokenService.makeAccessToken(user);
      const refreshTokenId = newRefreshSession.refreshTokenId;

      console.log('ccc');

      return await LoginSuccessDto.new(LoginSuccessDto, {
        accessToken,
        refreshTokenId,
        refTokenExpiresInSeconds,
      });
    } catch (e) {
      console.error('dasda', e);
      throw new BadRequestException();
    }

    // TODO: clean old refresh sessions
  }
}

export { LoginUsecase };
