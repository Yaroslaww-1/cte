import { Module } from '@nestjs/common';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleStrategy } from '@src/core/services/google-auth/google.strategy';
import { ConfigModule } from '@nestjs/config';
import { GoogleCreateOrLoginUserUsecase } from '@src/core/services/google-auth/usecases/google-create-or-login-user.usecase';
import { UserDao } from '@src/data/dao/user/user.dao';
import { UserMapper } from '@src/core/services/user/user.mapper';
import { RefreshSessionService } from '@src/core/services/auth/services/refresh-session.service';
import { AccessTokenService } from '@src/core/services/auth/services/access-token.service';
import { RefreshSessionMapper } from '@src/core/services/auth/refresh-session.mapper';
import { RefreshSessionDao } from '@src/data/dao/refresh-session/refresh-session.dao';
import { SharedServicesModule } from '@src/api/shared-services.module';

const mappers = [UserMapper, RefreshSessionMapper];
const daos = [UserDao, RefreshSessionDao];
const services = [RefreshSessionService, AccessTokenService];
const usecases = [GoogleCreateOrLoginUserUsecase];

@Module({
  imports: [SharedServicesModule, ConfigModule],
  controllers: [GoogleAuthController],
  providers: [...mappers, ...daos, ...usecases, ...services, GoogleStrategy],
})
export class GoogleAuthModule {}
