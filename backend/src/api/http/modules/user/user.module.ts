import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserDao } from '@src/data/dao/user/user.dao';
import { UserService } from '@core/services/user/user.service';

const daos = [UserDao];
const services = [UserService];

@Module({
  controllers: [UserController],
  providers: [...daos, ...services],
  exports: [...daos, ...services],
})
export class UserModule {}
