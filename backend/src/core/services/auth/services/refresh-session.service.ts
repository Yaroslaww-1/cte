import { Injectable } from '@nestjs/common';
import { InvalidRefreshSessionException } from '@src/core/exceptions/auth/invalid-refresh-session.exception';
import { SessionExpiredException } from '@src/core/exceptions/auth/session-expired.exception';
import { RefreshSessionDao } from '@src/data/dao/refresh-session/refresh-session.dao';
import { MAX_REFRESH_SESSIONS_COUNT } from '../constants';
import { RefreshSessionEntity } from '../entities/refresh-session.entity';

@Injectable()
export class RefreshSessionService {
  constructor(private readonly refreshSessionDao: RefreshSessionDao) {}

  async createRefreshSession(refreshSession: RefreshSessionEntity): Promise<void> {
    const isValidSessionsCount = await this.isValidSessionsCount(refreshSession.userId);
    if (isValidSessionsCount) {
      await this.refreshSessionDao.createOne(new RefreshSessionEntity(refreshSession));
    } else {
      await this.deleteAllUserRefreshSessions(refreshSession.userId);
      await this.refreshSessionDao.createOne(new RefreshSessionEntity(refreshSession));
    }
  }

  async verifyRefreshSession(refreshSession: RefreshSessionEntity, newFingerprint: string): Promise<void> {
    const nowTime = new Date().getTime();

    if (nowTime > refreshSession.expiresIn) {
      throw new SessionExpiredException();
    }
    // if (oldIp !== newIp) throw Exception // for best security
    if (refreshSession.fingerprint !== newFingerprint) {
      throw new InvalidRefreshSessionException();
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
