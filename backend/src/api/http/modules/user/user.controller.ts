import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { UserDto } from '@shared/dto';
import { UserService } from '@core/services/user/user.service';
import { CreateUserDto } from '@shared/dto';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async getUsers(): Promise<UserDto[]> {
		return await this.userService.getUsers();
	}

	@Get(':id')
	async getUserById(@Param('id') id: number): Promise<UserDto> {
		return await this.userService.getUserById(id);
	}

	@Post()
	async createNewUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
		return await this.userService.createNewUser(createUserDto);
	}

	@Delete(':id')
	async deleteUserById(@Param('id') id: string): Promise<void> {
		return await this.userService.deleteUserById(Number(id));
	}

	@Put(':id')
	async updateUserById(@Param('id') id: string, @Body() createUserDto: CreateUserDto): Promise<UserDto> {
		return await this.userService.updateUserById(Number(id), createUserDto);
	}
}
