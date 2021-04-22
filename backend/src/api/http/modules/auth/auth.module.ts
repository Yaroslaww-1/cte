import { Module } from '@nestjs/common';

import { RefreshSessionDao } from '@src/data/dao/refresh-session/refresh-session.dao';
import { AccessTokenService } from '@src/core/services/auth/services/access-token.service';
import { RefreshSessionService } from '@src/core/services/auth/services/refresh-session.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { SharedServicesModule } from '@src/api/shared-services.module';
import { LoginUsecase } from '@src/core/services/auth/usecases/login.usecase';
import { LogoutUsecase } from '@src/core/services/auth/usecases/logout.usecase';
import { RefreshTokensUsecase } from '@src/core/services/auth/usecases/refresh-tokens.usecase';
import { RefreshSessionMapper } from '@src/core/services/auth/refresh-session.mapper';

const mappers = [RefreshSessionMapper];
const daos = [RefreshSessionDao];
const services = [RefreshSessionService, AccessTokenService];
const usecases = [LoginUsecase, LogoutUsecase, RefreshTokensUsecase];

@Module({
  imports: [SharedServicesModule, UserModule],
  controllers: [AuthController],
  providers: [...mappers, ...daos, ...services, ...usecases],
  exports: [...mappers, ...daos, ...services, ...usecases],
})
export class AuthModule {}
