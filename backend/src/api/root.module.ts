import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpRootModule } from './http/modules/http-root.module';
import configuration from '../config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
    }),
    HttpRootModule,
  ],
})
export class RootModule {}