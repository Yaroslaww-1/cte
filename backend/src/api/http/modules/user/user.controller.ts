import { Controller, Get } from '@nestjs/common';
import { UserDto } from '@shared/dto';
import { UserService } from '@core/services/user/user.service';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async getUsers(): Promise<UserDto[]> {
		return await this.userService.getUsers();
	}
}
