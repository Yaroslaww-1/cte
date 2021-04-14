import { Injectable } from '@nestjs/common';

import { LogoutSuccessResponse } from '@shared/request-response';
import { IBaseUsecase } from '@src/core/abstraction/base-usecase.interface';
import { InvalidParamsException } from '@src/core/exceptions/invalid-params.exception';
import { RefreshSessionDao } from '@src/data/dao/refresh-session/refresh-session.dao';

@Injectable()
class LogoutUsecase implements IBaseUsecase<string, LogoutSuccessResponse> {
  constructor(private readonly refreshSessionDao: RefreshSessionDao) {}

  async execute(refreshTokenId: string): Promise<LogoutSuccessResponse> {
    if (!refreshTokenId) {
      throw new InvalidParamsException('Refresh token id not provided');
    }

    await this.refreshSessionDao.deleteAll({ refreshTokenId });

    return new LogoutSuccessResponse({ message: 'User is logged out from current session.' });
  }
}

export { LogoutUsecase };
