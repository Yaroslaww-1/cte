import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserDao } from '@src/data/dao/user/user.dao';
import { SharedServicesModule } from '@src/api/shared-services.module';
import { MailerModule } from '@src/adapters/mailer/mailer.module';
import { UserMapper } from '@src/core/services/user/user.mapper';
import { GetUsersUsecase } from '@src/core/services/user/usecases/get-users.usecase';
import { GetUserUsecase } from '@src/core/services/user/usecases/get-user.usecase';
import { CreateUserUsecase } from '@src/core/services/user/usecases/create-user.usecase';
import { SendConfirmEmailUsecase } from '@src/core/services/user/usecases/send-confirm-email.usecase';
import { ConfirmEmailUsecase } from '@src/core/services/user/usecases/confirm-email.usecase';

const mappers = [UserMapper];
const daos = [UserDao];
const usecases = [GetUsersUsecase, GetUserUsecase, CreateUserUsecase, SendConfirmEmailUsecase, ConfirmEmailUsecase];

@Module({
  imports: [SharedServicesModule, MailerModule],
  controllers: [UserController],
  providers: [...mappers, ...daos, ...usecases],
  exports: [...mappers, ...daos, ...usecases],
})
export class UserModule {}
