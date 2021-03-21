import { Injectable } from '@nestjs/common';
import { UserDao, IUserFilter } from '@src/data/dao/user/user.dao';
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

	// TODO: Reverse dependency of IUserFilter
	async getUser(filter: IUserFilter): Promise<UserDto> {
		const user = await this.userDao.findOne(filter);
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
