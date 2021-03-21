import { IUserModel } from '../dao/user/user.model';
import * as Knex from 'knex';
import { IDocumentModel } from '../dao/document/document.model';

declare module 'knex/types/tables' {
	interface ITables {
		users_composite: Knex.CompositeTableType<
			IUserModel,
			Pick<IUserModel, 'name' | 'email'>,
			Partial<Omit<IUserModel, 'id'>>
		>;

		documents_composite: Knex.CompositeTableType<
			IDocumentModel,
			Partial<Omit<IDocumentModel, 'id'>>,
			Partial<Omit<IDocumentModel, 'id'>>
		>;
	}
}
