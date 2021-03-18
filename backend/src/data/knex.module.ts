import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexService } from './knex.service';
import { knexConnectionFactory } from './knex-connection';

@Global()
@Module({
	imports: [ConfigModule],
	providers: [KnexService, knexConnectionFactory],
	exports: [KnexService, knexConnectionFactory],
})
export class KnexModule {}
