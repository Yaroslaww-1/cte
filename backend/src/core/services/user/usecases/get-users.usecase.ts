import { Injectable } from '@nestjs/common';

import { IBaseUsecase } from '@src/core/abstraction/base-usecase.interface';
import { UserDto } from '@shared/dto';
import { UserMapper } from '../user.mapper';
import { UserDao } from '@src/data/dao/user/user.dao';

@Injectable()
class GetUsersUsecase implements IBaseUsecase<null, UserDto[]> {
  constructor(private readonly userDao: UserDao, private readonly userMapper: UserMapper) {}

  async execute(): Promise<UserDto[]> {
    const users = await this.userDao.findAll({});
    return await this.userMapper.mapToDtoMultiple(users);
  }
}

export { GetUsersUsecase };
