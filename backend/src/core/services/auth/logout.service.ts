import { Injectable } from '@nestjs/common';
import { LogoutSuccessDto } from '@shared/dto';
import { InvalidParamsException } from '@src/core/exceptions/invalid-params.exception';
import { RefreshSessionDao } from '@src/data/dao/refresh-session/refresh-session.dao';

@Injectable()
export class LogoutService {
  constructor(private readonly refreshSessionDao: RefreshSessionDao) {}

  async logout(refreshToken: string): Promise<LogoutSuccessDto> {
    if (!refreshToken) {
      throw new InvalidParamsException('Refresh token not provided');
    }

    await this.refreshSessionDao.deleteAll({ refreshToken });

    // TODO: fix no typings support here
    return new LogoutSuccessDto({ message: 'User is logged out from current session.' });
  }
}
