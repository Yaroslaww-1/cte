import { Injectable } from '@nestjs/common';
import { RefreshSessionDao } from '@src/data/dao/refresh-session/refresh-session.dao';
import { MAX_REFRESH_SESSIONS_COUNT } from '../constants';
import { CreateRefreshSessionDto } from '../dto/create-refresh-session.dto';
import { RefreshSessionEntity } from '../entities/refresh-session.entity';

@Injectable()
export class RefreshSessionService {
  constructor(private readonly refreshSessionDao: RefreshSessionDao) {}

  async createRefreshSession(refreshSession: RefreshSessionEntity): Promise<void> {
    const isValidSessionsCount = await this.isValidSessionsCount(refreshSession.userId);
    if (isValidSessionsCount) {
      await this.refreshSessionDao.createOne(new CreateRefreshSessionDto(refreshSession));
    } else {
      await this.deleteAllUserRefreshSessions(refreshSession.userId);
      await this.refreshSessionDao.createOne(new CreateRefreshSessionDto(refreshSession));
    }
  }

  private async isValidSessionsCount(userId: number): Promise<boolean> {
    const existingSessionsCount = await this.refreshSessionDao.count({ userId });
    return existingSessionsCount < MAX_REFRESH_SESSIONS_COUNT;
  }

  private async deleteAllUserRefreshSessions(userId: number): Promise<void> {
    return await this.refreshSessionDao.deleteAll({ userId });
  }
}
