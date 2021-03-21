import { Inject, Injectable } from '@nestjs/common';
import { IUserModel, UserModel } from '@src/data/dao/user/user.model';
import { CreateUserDto, UpdateUserDto } from '@shared/dto';
import { QueryBuilder, ModelClass } from 'objection';

type IUserFilter = Partial<IUserModel>;

@Injectable()
export class UserDao {
	constructor(@Inject(UserModel) private readonly userModel: ModelClass<UserModel>) {}

	private updateWhereWithFilters(
		{ id, name, email }: IUserFilter,
		qb: QueryBuilder<UserModel, UserModel[]>
	): QueryBuilder<UserModel, UserModel[]> {
		if (id) {
			qb.where('id', id);
		}

		if (name) {
			qb.where('name', name);
		}

		if (email) {
			qb.where('email', email);
		}

		return qb;
	}

	async findAll(filter: IUserFilter): Promise<IUserModel[]> {
		return await this.userModel
			.query()
			.withGraphFetched({ documents: true })
			.where(qb => this.updateWhereWithFilters(filter, qb));
	}

	async findOne(filter: IUserFilter): Promise<IUserModel | undefined> {
		return await this.userModel
			.query()
			.withGraphFetched({ documents: true })
			.where(qb => this.updateWhereWithFilters(filter, qb))
			.first();
	}

	async createOne(createUserDto: CreateUserDto): Promise<IUserModel> {
		return await this.userModel.query().insert(createUserDto).returning('*');
	}

	async deleteOne(id: number): Promise<void> {
		await this.userModel.query().where('id', id);
	}

	async updateOne(id: number, updateUserDto: UpdateUserDto): Promise<IUserModel> {
		return await this.userModel.query().where({ id }).update(updateUserDto).returning('*').first();
	}
}
