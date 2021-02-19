import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from '@data/user/user.repository';
import { UserService } from './user.service';

const repositories = [UserRepository];
const services = [UserService];

@Module({
  controllers: [UserController],
  providers: [...repositories, ...services],
})
export class UserModule {}