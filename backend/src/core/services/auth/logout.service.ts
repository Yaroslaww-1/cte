import { Injectable } from '@nestjs/common';
import { LogoutDto, LogoutSuccessDto } from '@shared/dto';
import { RefreshSessionDao } from '@src/data/dao/refresh-session/refresh-session.dao';

@Injectable()
export class LogoutService {
  constructor(private readonly refreshSessionDao: RefreshSessionDao) {}

  async logout(logoutDto: LogoutDto): Promise<LogoutSuccessDto> {
    const { refreshToken } = logoutDto;

    await this.refreshSessionDao.deleteAll({ refreshToken });

    // TODO: fix no typings support here
    return new LogoutSuccessDto({ message: 'User is logged out from current session.' });
  }
}
