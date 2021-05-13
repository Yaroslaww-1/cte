import { Module } from '@nestjs/common';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleStrategy } from '@src/core/services/google-auth/google.strategy';
import { ConfigModule } from '@nestjs/config';
import { GoogleCreateUserUsecase } from '@src/core/services/user/usecases/google-create-user.usecase';
import { UserDao } from '@src/data/dao/user/user.dao';
import { UserMapper } from '@src/core/services/user/user.mapper';

const mappers = [UserMapper];
const daos = [UserDao];
const usecases = [GoogleCreateUserUsecase];

@Module({
  imports: [ConfigModule],
  controllers: [GoogleAuthController],
  providers: [...mappers, ...daos, ...usecases, GoogleStrategy],
})
export class GoogleAuthModule {}
