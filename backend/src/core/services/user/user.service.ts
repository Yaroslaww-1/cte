import { Injectable } from '@nestjs/common';
import { UserRepository } from '@data/user/user.repository';
import { CreateUserDto, UserDto } from '@shared/dto';
import { mapUserEntityToUserDto } from './user.mappings';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<UserDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(mapUserEntityToUserDto);
  }

  async getUserById(id: number): Promise<UserDto[]> {
    const user = await this.userRepository.findOne(id);
    return user.map(mapUserEntityToUserDto);
  }

  async createNewUser(createUserDto: CreateUserDto): Promise<UserDto[]> {
    const user = await this.userRepository.createOne(createUserDto);
    return user.map(mapUserEntityToUserDto);
  }

  async deleteUserById(id: number) {
    await this.userRepository.deleteOne(id);
  }

  async updateUserById(id: number, createUserDto: CreateUserDto): Promise<UserDto[]> {
    const user = await this.userRepository.updateOne(id, createUserDto);
    return user.map(mapUserEntityToUserDto);
  }
}
