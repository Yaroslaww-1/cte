import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpRootModule } from './http/modules/http-root.module';
import configuration from '../config/config';
import { WSRootModule } from './ws/modules/ws-root.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
      isGlobal: true,
    }),
    HttpRootModule,
    WSRootModule,
  ],
})
export class RootModule {}