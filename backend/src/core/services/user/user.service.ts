import { Injectable } from '@nestjs/common';
import { UserDao } from '@src/data/dao/user/user.dao';
import { CreateUserDto, UserDto } from '@shared/dto';
import { mapUserEntityToUserDto } from './user.mappings';
import { NotFoundException } from '@src/core/exceptions/not-found.exception';

@Injectable()
export class UserService {
	constructor(private readonly userDao: UserDao) {}

	async getUsers(): Promise<UserDto[]> {
		const users = await this.userDao.findAll({});
		return users.map(mapUserEntityToUserDto);
	}

	async getUserById(id: number): Promise<UserDto> {
		const user = await this.userDao.findOne({ id });
		if (!user) {
			throw new NotFoundException('user');
		}
		return mapUserEntityToUserDto(user);
	}

	async createNewUser(createUserDto: CreateUserDto): Promise<UserDto> {
		const user = await this.userDao.createOne(createUserDto);
		return mapUserEntityToUserDto(user);
	}

	async deleteUserById(id: number): Promise<void> {
		await this.userDao.deleteOne(id);
	}

	async updateUserById(id: number, createUserDto: CreateUserDto): Promise<UserDto> {
		const user = await this.userDao.updateOne(id, createUserDto);
		return mapUserEntityToUserDto(user);
	}
}
