import Knex from 'knex';
import { DatabaseService } from './database.service';

export const KNEX_CONNECTION = 'KNEX_CONNECTION';

export const knexConnectionFactory = {
	provide: KNEX_CONNECTION,
	useFactory: async (databaseService: DatabaseService): Promise<Knex> => {
		return databaseService.getKnex();
	},
	inject: [DatabaseService],
};
