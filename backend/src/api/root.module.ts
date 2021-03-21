import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpRootModule } from './http/modules/http-root.module';
import { configFactory } from '../config/config';
import { WSRootModule } from './ws/modules/ws-root.module';
import { DatabaseModule } from '@src/data/database.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			load: [configFactory],
			isGlobal: true,
		}),
		DatabaseModule,
		HttpRootModule,
		WSRootModule,
	],
})
export class RootModule {}
