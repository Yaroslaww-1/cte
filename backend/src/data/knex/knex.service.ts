import { Injectable } from '@nestjs/common';
import * as Knex from 'knex';

@Injectable()
export class KnexService {
  private knexConnection = Knex(({
    client: 'pg',
    connection: process.env.DATABASE_CONNECTION_URL,
  }));
  getKnex() {
    return this.knexConnection;
  }
}