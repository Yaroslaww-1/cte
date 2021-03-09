import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnexService } from './knex.service';

@Module({
  imports: [ConfigModule],
  providers: [KnexService],
})
export class KnexModule {}