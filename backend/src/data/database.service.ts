import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DATABASE_CONFIG } from '@src/config/config';
import { IDatabaseConfig } from '@src/config/database.config';
import { knexSnakeCaseMappers, Model } from 'objection';
import * as Knex from 'knex';

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
  }

  getKnex(): Knex {
    return this.knexConnection;
  }
}
