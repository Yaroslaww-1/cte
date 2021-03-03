import { Injectable, Module } from '@nestjs/common';
import * as Knex from 'knex';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env.example',
  })],
})
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