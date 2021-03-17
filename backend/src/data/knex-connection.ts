import Knex from 'knex';
import { KnexService } from './knex.service';

export const KNEX_CONNECTION = 'KNEX_CONNECTION';

export const knexConnectionFactory = {
	provide: KNEX_CONNECTION,
	useFactory: async (knexService: KnexService): Promise<Knex> => {
		return knexService.getKnex();
	},
	inject: [KnexService],
};
