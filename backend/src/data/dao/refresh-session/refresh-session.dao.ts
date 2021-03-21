import { Inject, Injectable } from '@nestjs/common';
import { IRefreshSessionModel, RefreshSessionModel } from './refresh-session.model';
import { ModelClass, QueryBuilder } from 'objection';
import { CreateRefreshSessionDto } from '@src/core/services/auth/dto/create-refresh-session.dto';

type IRefreshSessionFilter = {
	userId: number;
};

@Injectable()
export class RefreshSessionDao {
	constructor(@Inject(RefreshSessionModel) private readonly refreshSessionModel: ModelClass<RefreshSessionModel>) {}

	private updateWhereWithFilters(
		{ userId }: IRefreshSessionFilter,
		qb: QueryBuilder<RefreshSessionModel, unknown>
	): QueryBuilder<RefreshSessionModel, unknown> {
		if (userId) {
			qb.where('userId', userId);
		}

		return qb;
	}

	async findAll(): Promise<IRefreshSessionModel[]> {
		return await this.refreshSessionModel.query().withGraphFetched({ user: true });
	}

	async createOne(refreshSession: CreateRefreshSessionDto): Promise<IRefreshSessionModel> {
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
