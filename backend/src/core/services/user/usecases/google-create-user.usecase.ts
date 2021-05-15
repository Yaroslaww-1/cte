import { Injectable } from '@nestjs/common';
import { IBaseUsecase } from '@src/core/abstraction/base-usecase.interface';
import { UserDto } from '@shared/dto';
import { UserMapper } from '../user.mapper';
import { UserDao } from '@src/data/dao/user/user.dao';
import { GoogleUserRequest } from '@shared/request-response/user/google-create-user.request';
import { InvalidParamsException } from '@src/core/exceptions/invalid-params.exception';
import { UserEntity } from '../entities/user.entity';
import { BaseEntity } from '@src/core/abstraction/base-entity';

@Injectable()
export class GoogleCreateUserUsecase implements IBaseUsecase<GoogleUserRequest, UserDto> {
  constructor(private readonly userDao: UserDao, private readonly userMapper: UserMapper) {}

  async execute(googleUserRequest: GoogleUserRequest): Promise<UserDto> {
    const isUserWithGivenEmailExists = await this.userDao.findOne({ email: googleUserRequest.email });
    if (isUserWithGivenEmailExists) {
      throw new InvalidParamsException('User with given email already exists');
    }

    const user = await BaseEntity.new(UserEntity, {
      name: googleUserRequest.name,
      email: googleUserRequest.email,
    });

    await this.userDao.createOne(user);

    return await this.userMapper.mapToDto(user);
  }
}
