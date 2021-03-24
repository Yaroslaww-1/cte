import { Injectable } from '@nestjs/common';
import { UserDao, IUserFilter } from '@src/data/dao/user/user.dao';
import { CreateUserDto, UpdateUserDto, UserDto } from '@shared/dto';
import { mapUserEntityToUserDto, mapUserModelToUserEntity } from './user.mappings';
import { NotFoundException } from '@src/core/exceptions/not-found.exception';
import { makePasswordHash } from './helpers/make-password-hash.helper';
import { InvalidParamsException } from '@src/core/exceptions/invalid-params.exception';
import { EmailConfirmService } from './services/email-confirm.service';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao, private readonly emailConfirmService: EmailConfirmService) {}

  async getUsers(): Promise<UserDto[]> {
    const users = await this.userDao.findAll({});
    return users.map(mapUserEntityToUserDto);
  }

  // TODO: Reverse dependency of IUserFilter
  async getUser(filter: IUserFilter): Promise<UserDto> {
    const user = await this.userDao.findOne(filter);
    if (!user) {
      throw new NotFoundException('user');
    }
    return mapUserEntityToUserDto(user);
  }

  async createNewUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const isUserWithGivenEmailExists = await this.getUser({ email: createUserDto.email });
    if (isUserWithGivenEmailExists) {
      throw new InvalidParamsException('User with given email is already exists');
    }

    const passwordHash = await makePasswordHash(createUserDto.password);

    const user = mapUserModelToUserEntity(
      await this.userDao.createOne({
        email: createUserDto.email,
        name: createUserDto.name,
        passwordHash,
      })
    );

    const emailConfirmToken = await this.emailConfirmService.makeEmailConfirmToken(user);
    await this.userDao.updateOne(user.id, { emailConfirmToken });

    await this.emailConfirmService.sendConfirmEmail(user.email, emailConfirmToken);

    return mapUserEntityToUserDto(user);
  }

  async deleteUserById(id: number): Promise<void> {
    await this.userDao.deleteOne(id);
  }

  async updateUserById(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.userDao.updateOne(id, updateUserDto);
    return mapUserEntityToUserDto(user);
  }
}
