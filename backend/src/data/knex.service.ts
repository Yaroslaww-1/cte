import { Injectable } from '@nestjs/common';

const Knex = require('knex');

@Injectable()
export class KnexService {
    private knexConnection = new Knex(({
        client: 'pg',
        connection: 'postgres://postgres:11037853@127.0.0.1/cte',
    }));
    getKnex() {
        return this.knexConnection;
    }
}