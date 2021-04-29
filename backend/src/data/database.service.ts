import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { knexSnakeCaseMappers, Model } from 'objection';
import * as Knex from 'knex';
import * as pg from 'pg';

import { DATABASE_CONFIG } from '@src/config/config';
import { IDatabaseConfig } from '@src/config/database.config';

@Injectable()
export class DatabaseService {
  private knexConnection: Knex;

  constructor(private configService: ConfigService) {
    this.knexConnection = Knex({
      client: 'pg',
      connection: this.configService.get<IDatabaseConfig>(DATABASE_CONFIG)?.CONNECTION_URL,
      ...knexSnakeCaseMappers(),
    });

    Model.knex(this.knexConnection);

    // Fix for bigInt parsing. See https://github.com/knex/knex/issues/387
    pg.types.setTypeParser(20, 'text', parseInt);
  }

  getKnex(): Knex {
    return this.knexConnection;
  }
}
