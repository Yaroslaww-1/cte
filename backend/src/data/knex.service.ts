import { Injectable } from '@nestjs/common';
import * as Knex from 'knex';

@Injectable()
export class KnexService {
  private knexConnection = Knex(({
    client: 'pg',
    connection: 'postgres://postgres:11037853@127.0.0.1/cte',
  }));
  getKnex() {
    return this.knexConnection;
  }
}