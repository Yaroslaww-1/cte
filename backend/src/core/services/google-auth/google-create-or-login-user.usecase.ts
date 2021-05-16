import { Injectable } from '@nestjs/common';
import { UserDto } from '@shared/dto';
import { UserMapper } from '../user/user.mapper';
import { UserDao } from '@src/data/dao/user/user.dao';
import { GoogleUserRequest } from '@shared/request-response/user/google-create-user.request';
import { UserEntity } from '../user/entities/user.entity';
import { BaseEntity } from '@src/core/abstraction/base-entity';

@Injectable()
export class GoogleCreateOrLoginUserUsecase {
  constructor(private readonly userDao: UserDao, private readonly userMapper: UserMapper) {}
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async execute(request: any, googleUserRequest: GoogleUserRequest): Promise<UserDto> {
    const userModel = await this.userDao.findOne({ email: googleUserRequest.email });
    if (!userModel) {
      const user = await BaseEntity.new(UserEntity, {
        name: googleUserRequest.name,
        email: googleUserRequest.email,
      });
      await this.userDao.createOne(user);
      return await this.userMapper.mapToDto(user);
    }
    // login procedure here...
    return await this.userMapper.mapToDto(userModel);
  }
}
