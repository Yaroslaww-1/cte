import { Injectable } from '@nestjs/common';

import { IBaseUsecase } from '@src/core/abstraction/base-usecase.interface';
import { UserDto } from '@shared/dto';
import { UserMapper } from '../user.mapper';
import { UserDao } from '@src/data/dao/user/user.dao';
import { GoogleCreateUserRequest } from '@shared/request-response/user/google-create-user.request';
import { InvalidParamsException } from '@src/core/exceptions/invalid-params.exception';
import { UserEntity } from '../entities/user.entity';
import { SendConfirmEmailUsecase } from './send-confirm-email.usecase';
import { BaseEntity } from '@src/core/abstraction/base-entity';

@Injectable()
export class GoogleCreateUserUsecase implements IBaseUsecase<GoogleCreateUserRequest, UserDto> {
  constructor(private readonly userDao: UserDao, private readonly userMapper: UserMapper) {}

  async execute(googleCreateUserRequest: GoogleCreateUserRequest): Promise<UserDto> {
    const isUserWithGivenEmailExists = await this.userDao.findOne({ email: googleCreateUserRequest.email });
    if (isUserWithGivenEmailExists) {
      throw new InvalidParamsException('User with given email already exists');
    }

    const user = await BaseEntity.new(UserEntity, {
      name: googleCreateUserRequest.name,
      email: googleCreateUserRequest.email,
      passwordHash: '',
    });

    await this.userDao.createOne(user);

    return await this.userMapper.mapToDto(user);
  }
}
