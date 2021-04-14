// import { Injectable } from '@nestjs/common';

// import { MAX_REFRESH_SESSIONS_COUNT } from '../constants';
// import { RefreshSessionEntity } from '../entities/refresh-session.entity';
// import { IBaseUsecase } from '@src/core/abstraction/base-usecase.interface';
// import { RefreshSessionDao } from '@src/data/dao/refresh-session/refresh-session.dao';

// @Injectable()
// class CreateRefreshSessionUsecase implements IBaseUsecase<RefreshSessionEntity, void> {
//   constructor(private readonly refreshSessionDao: RefreshSessionDao) {}

//   async execute(refreshSession: RefreshSessionEntity): Promise<void> {
//     const isValidSessionsCount = await this.isValidSessionsCount(refreshSession.userId);
//     if (isValidSessionsCount) {
//       await this.refreshSessionDao.createOne(refreshSession);
//     } else {
//       await this.deleteAllUserRefreshSessions(refreshSession.userId);
//       await this.refreshSessionDao.createOne(refreshSession);
//     }
//   }

//   private async isValidSessionsCount(userId: string): Promise<boolean> {
//     const existingSessionsCount = await this.refreshSessionDao.count({ userId });
//     return existingSessionsCount < MAX_REFRESH_SESSIONS_COUNT;
//   }

//   private async deleteAllUserRefreshSessions(userId: string): Promise<void> {
//     return await this.refreshSessionDao.deleteAll({ userId });
//   }
// }

// export { CreateRefreshSessionUsecase };
