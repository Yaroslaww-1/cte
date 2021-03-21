import { Inject, Injectable } from '@nestjs/common';
import { IDeleteOne, IFindAll, IFindOne, IUpdateOne, ICreateOne } from '@shared/abstraction';
import { IUserModel } from '@src/data/dao/user/user.model';
import { CreateUserDto, UpdateUserDto } from '@shared/dto';
import Knex, { QueryBuilder } from 'knex';
import { KNEX_CONNECTION } from '@src/data/knex-connection';

type IUserFilter = Partial<IUserModel>;

@Injectable()
export class UserRepository
	implements
		IFindAll<IUserModel, IUserFilter>,
		IFindOne<IUserModel, IUserFilter>,
		ICreateOne<CreateUserDto, IUserModel>,
		IDeleteOne,
		IUpdateOne<UpdateUserDto, IUserModel> {
	constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

	private updateWhereWithFilters(
		{ id, name, email }: IUserFilter,
		qb: QueryBuilder<IUserModel>
	): QueryBuilder<IUserModel> {
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
		return await this.knex<IUserModel>('users')
			.select('*')
			.where(qb => this.updateWhereWithFilters(filter, qb));
	}

	async findOne(filter: IUserFilter): Promise<IUserModel | undefined> {
		return await this.knex<IUserModel>('users')
			.select('*')
			.where(qb => this.updateWhereWithFilters(filter, qb))
			.first();
	}

	async createOne(createUserDto: CreateUserDto): Promise<IUserModel> {
		const [newUser] = await this.knex<IUserModel>('users')
			.insert({ name: createUserDto.name, email: createUserDto.email })
			.returning('*');
		return newUser;
	}

	async deleteOne(id: number): Promise<void> {
		await this.knex<IUserModel>('users').where('id', id).del();
	}

	async updateOne(id: number, updateUserDto: UpdateUserDto): Promise<IUserModel> {
		return await this.knex<IUserModel>('users')
			.where({ id })
			.update({ name: updateUserDto.name })
			.returning(['id', 'name']);
	}
}
