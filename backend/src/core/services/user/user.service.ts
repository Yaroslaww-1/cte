import { Injectable } from '@nestjs/common';
import { UserRepository } from '@src/data/dao/user/user.dao';
import { CreateUserDto, UserDto } from '@shared/dto';
import { mapUserEntityToUserDto } from './user.mappings';
import { NotFoundException } from '@src/core/exceptions/not-found.exception';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async getUsers(): Promise<UserDto[]> {
		const users = await this.userRepository.findAll({});
		return users.map(mapUserEntityToUserDto);
	}

	async getUserById(id: number): Promise<UserDto> {
		const user = await this.userRepository.findOne({ id });
		if (!user) {
			throw new NotFoundException('user');
		}
		return mapUserEntityToUserDto(user);
	}

	async createNewUser(createUserDto: CreateUserDto): Promise<UserDto> {
		const user = await this.userRepository.createOne(createUserDto);
		return mapUserEntityToUserDto(user);
	}

	async deleteUserById(id: number): Promise<void> {
		await this.userRepository.deleteOne(id);
	}

	async updateUserById(id: number, createUserDto: CreateUserDto): Promise<UserDto> {
		const user = await this.userRepository.updateOne(id, createUserDto);
		return mapUserEntityToUserDto(user);
	}
}
