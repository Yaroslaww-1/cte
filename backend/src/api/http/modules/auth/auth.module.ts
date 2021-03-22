import { Module } from '@nestjs/common';
import { RefreshSessionDao } from '@src/data/dao/refresh-session/refresh-session.dao';
import { LoginService } from '@src/core/services/auth/login.service';
import { JwtService } from '@src/core/services/auth/services/jwt.service';
import { AccessTokenService } from '@src/core/services/auth/services/access-token.service';
import { RefreshSessionService } from '@src/core/services/auth/services/refresh-session.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

const daos = [RefreshSessionDao];
const services = [JwtService, RefreshSessionService, AccessTokenService, LoginService];

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [...daos, ...services],
})
export class AuthModule {}
