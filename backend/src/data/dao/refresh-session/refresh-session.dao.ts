import { Inject, Injectable } from '@nestjs/common';
import { IRefreshSessionModel, RefreshSessionModel } from './refresh-session.model';
import { ModelClass, QueryBuilder } from 'objection';

type IRefreshSessionFilter = {
  refreshTokenId?: string;
  userId?: number;
};

@Injectable()
export class RefreshSessionDao {
  constructor(@Inject(RefreshSessionModel) private readonly refreshSessionModel: ModelClass<RefreshSessionModel>) {}

  private updateWhereWithFilters(
    { userId, refreshTokenId }: IRefreshSessionFilter,
    qb: QueryBuilder<RefreshSessionModel, unknown>
  ): QueryBuilder<RefreshSessionModel, unknown> {
    if (userId) {
      qb.where('userId', userId);
    }

    if (refreshTokenId) {
      qb.where('refreshTokenId', refreshTokenId);
    }

    return qb;
  }

  async findOne(filter: IRefreshSessionFilter): Promise<IRefreshSessionModel | undefined> {
    return await this.refreshSessionModel
      .query()
      .withGraphFetched({ user: true })
      .where(qb => this.updateWhereWithFilters(filter, qb))
      .first();
  }

  async findAll(): Promise<IRefreshSessionModel[]> {
    return await this.refreshSessionModel.query().withGraphFetched({ user: true });
  }

  async createOne(refreshSession: Omit<IRefreshSessionModel, 'id' | 'user'>): Promise<IRefreshSessionModel> {
    return await this.refreshSessionModel.query().insert(refreshSession);
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
