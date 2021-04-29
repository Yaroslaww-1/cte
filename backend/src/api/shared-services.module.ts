import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@src/core/services/shared/jwt.service';

@Module({
  imports: [ConfigModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class SharedServicesModule {}
