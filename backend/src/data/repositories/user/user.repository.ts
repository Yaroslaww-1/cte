import { Inject, Injectable } from '@nestjs/common';
import { IDeleteOne, IFindAll, IFindOne, IUpdateOne, ICreateOne } from '@shared/abstraction';
import { IUserModel } from '@src/data/repositories/user/user.model';
import { CreateUserDto, UpdateUserDto } from '@shared/dto';
import Knex from 'knex';
import { KNEX_CONNECTION } from '@src/data/knex-connection';

@Injectable()
export class UserRepository
	implements
		IFindAll<IUserModel>,
		IFindOne<IUserModel>,
		ICreateOne<CreateUserDto, IUserModel>,
		IDeleteOne,
		IUpdateOne<UpdateUserDto, IUserModel> {
	constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

	async findAll(): Promise<IUserModel[]> {
		const usersTable = await this.knex<IUserModel>('users').select('id', 'name');
		return usersTable.map(user => <IUserModel>{ id: user.id, name: user.name });
	}

	async findOne(id: number): Promise<IUserModel> {
		const usersTable = await this.knex<IUserModel>('users').select('id', 'name').where('id', id);
		return <IUserModel>{ id: usersTable[0].id, name: usersTable[0].name };
	}

	async createOne(createUserDto: CreateUserDto): Promise<IUserModel> {
		const newUser = await this.knex<IUserModel>('users').insert({ name: createUserDto.name }).returning('*');
		return <IUserModel>{ id: newUser[0].id, name: newUser[0].name };
	}

	async deleteOne(id: number): Promise<void> {
		await this.knex<IUserModel>('users').where('id', id).del();
	}

	async updateOne(id: number, updateUserDto: UpdateUserDto): Promise<IUserModel> {
		return await this.knex<IUserModel>('users')
			.where({ id: id })
			.update({ name: updateUserDto.name })
			.returning(['id', 'name']);
	}
}
