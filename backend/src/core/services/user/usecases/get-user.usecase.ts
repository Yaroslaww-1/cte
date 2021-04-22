import { Injectable } from '@nestjs/common';

import { IBaseUsecase } from '@src/core/abstraction/base-usecase.interface';
import { UserDto } from '@shared/dto';
import { UserMapper } from '../user.mapper';
import { UserDao } from '@src/data/dao/user/user.dao';
import { NotFoundException } from '@src/core/exceptions/not-found.exception';

@Injectable()
class GetUserUsecase implements IBaseUsecase<string, UserDto> {
  constructor(private readonly userDao: UserDao, private readonly userMapper: UserMapper) {}

  async execute(userId: string): Promise<UserDto> {
    const user = await this.userDao.findOne({ id: userId });
    if (!user) {
      throw new NotFoundException('user');
    }
    return await this.userMapper.mapToDto(user);
  }
}

export { GetUserUsecase };
