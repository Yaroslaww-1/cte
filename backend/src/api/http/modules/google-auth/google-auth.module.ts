import { Module } from '@nestjs/common';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthService } from '@src/core/services/google-auth/google-auth.service';
import { GoogleStrategy } from '@src/core/services/google-auth/google.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, GoogleStrategy],
})
export class GoogleAuthModule {}
