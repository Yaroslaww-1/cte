import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserDao } from '@src/data/dao/user/user.dao';
import { UserService } from '@core/services/user/user.service';
import { EmailConfirmService } from '@src/core/services/user/services/email-confirm.service';
import { SharedServicesModule } from '@src/api/shared-services.module';
import { MailerModule } from '@src/adapters/mailer/mailer.module';

const daos = [UserDao];
const services = [UserService, EmailConfirmService];

@Module({
  imports: [SharedServicesModule, MailerModule],
  controllers: [UserController],
  providers: [...daos, ...services],
  exports: [...daos, ...services],
})
export class UserModule {}
