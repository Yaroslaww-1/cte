import { IUserModel } from '../repositories/user/user.model';
import * as Knex from 'knex';

declare module 'knex/types/tables' {
	interface ITables {
		users_composite: Knex.CompositeTableType<
			IUserModel,
			Pick<IUserModel, 'name' | 'email'>,
			Partial<Omit<IUserModel, 'id'>>
		>;
	}
}
