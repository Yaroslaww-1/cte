import { Injectable } from '@nestjs/common';

import { IBaseUsecase } from '@src/core/abstraction/base-usecase.interface';
import { UserDto } from '@shared/dto';
import { UserMapper } from '../user.mapper';
import { UserDao } from '@src/data/dao/user/user.dao';
import { CreateUserRequest } from '@shared/request-response';
import { InvalidParamsException } from '@src/core/exceptions/invalid-params.exception';
import { UserEntity } from '../entities/user.entity';
import { SendConfirmEmailUsecase } from './send-confirm-email.usecase';

@Injectable()
export class CreateUserUsecase implements IBaseUsecase<CreateUserRequest, UserDto> {
  constructor(
    private readonly userDao: UserDao,
    private readonly userMapper: UserMapper,
    private readonly sendConfirmEmailUsecase: SendConfirmEmailUsecase,
  ) {}

  async execute(createUserRequest: CreateUserRequest): Promise<UserDto> {
    const isUserWithGivenEmailExists = await this.userDao.findOne({ email: createUserRequest.email });
    if (isUserWithGivenEmailExists) {
      throw new InvalidParamsException('User with given email already exists');
    }

    const user = await UserEntity.newWithoutPasswordHash(createUserRequest);

    await this.userDao.createOne(user);

    await this.sendConfirmEmailUsecase.execute(user);

    return await this.userMapper.mapToDto(user);
  }
}
