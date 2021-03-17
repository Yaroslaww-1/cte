import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

import { configFactory } from '../config/config';
const config = configFactory();

export default {
	client: 'pg',
	connection: config.DATABASE.CONNECTION_URL,
	pool: {
		min: 2,
		max: 10,
	},
	migrations: {
		tableName: 'knex_migrations',
		directory: './migrations',
	},
};
