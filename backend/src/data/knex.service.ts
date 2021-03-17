import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DATABASE_CONFIG } from '@src/config/config';
import { IDatabaseConfig } from '@src/config/database.config';
import * as Knex from 'knex';

@Injectable()
export class KnexService {
	private knexConnection: Knex;

	constructor(private configService: ConfigService) {
		this.knexConnection = Knex({
			client: 'pg',
			connection: this.configService.get<IDatabaseConfig>(DATABASE_CONFIG)?.CONNECTION_URL,
		});
	}

	getKnex(): Knex {
		return this.knexConnection;
	}
}
