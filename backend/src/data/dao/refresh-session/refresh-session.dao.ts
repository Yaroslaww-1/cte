import { Inject, Injectable } from '@nestjs/common';
import { IRefreshSessionModel, RefreshSessionModel } from './refresh-session.model';
import { ModelClass, QueryBuilder } from 'objection';
import { RefreshSessionMapper } from '@src/core/services/auth/refresh-session.mapper';
import { RefreshSessionEntity } from '@src/core/services/auth/entities/refresh-session.entity';

type IRefreshSessionFilter = {
  refreshTokenId?: string;
  userId?: string;
};

@Injectable()
export class RefreshSessionDao {
  constructor(
    @Inject(RefreshSessionModel) private readonly refreshSessionModel: ModelClass<RefreshSessionModel>,
    private readonly refreshSessionMapper: RefreshSessionMapper,
  ) {}

  private updateWhereWithFilters(
    { userId, refreshTokenId }: IRefreshSessionFilter,
    qb: QueryBuilder<RefreshSessionModel, unknown>,
  ): QueryBuilder<RefreshSessionModel, unknown> {
    if (userId) {
      qb.where('userId', userId);
    }

    if (refreshTokenId) {
      qb.where('refreshTokenId', refreshTokenId);
    }

    return qb;
  }

  async findOne(filter: IRefreshSessionFilter): Promise<RefreshSessionEntity | null> {
    const refreshSession = await this.refreshSessionModel
      .query()
      .withGraphFetched({ user: true })
      .where(qb => this.updateWhereWithFilters(filter, qb))
      .first();
    if (!refreshSession) {
      return null;
    }
    return await this.refreshSessionMapper.mapToEntity(refreshSession);
  }

  async findAll(): Promise<RefreshSessionEntity[]> {
    const refreshSessions = await this.refreshSessionModel.query().withGraphFetched({ user: true });
    return await this.refreshSessionMapper.mapToEntityMultiple(refreshSessions);
  }

  async createOne(createRefreshSession: Omit<IRefreshSessionModel, 'user'>): Promise<RefreshSessionEntity> {
    const refreshSession = await this.refreshSessionModel.query().insert(createRefreshSession).returning('*');
    return await this.refreshSessionMapper.mapToEntity(refreshSession);
  }

  async count(filter: IRefreshSessionFilter): Promise<number> {
    return await this.refreshSessionModel
      .query()
      .where(qb => this.updateWhereWithFilters(filter, qb))
      .resultSize();
  }

  async deleteAll(filter: IRefreshSessionFilter): Promise<void> {
    await this.refreshSessionModel
      .query()
      .delete()
      .where(qb => this.updateWhereWithFilters(filter, qb));
  }
}
