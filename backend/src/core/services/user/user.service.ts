import { Injectable } from '@nestjs/common';
import { UserRepository } from '@data/user/user.repository';
import { UserDto } from '@shared/dto';
import { mapUserEntityToUserDto } from './user.mappings';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async getUsers(): Promise<UserDto[]> {
		const users = await this.userRepository.findAll();
		return users.map(mapUserEntityToUserDto);
	}
}
