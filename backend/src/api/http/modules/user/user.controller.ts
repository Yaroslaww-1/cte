import { Controller, Get } from '@nestjs/common';
import { UserDto } from '@shared/dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserDto[]> {
    const users = await this.userService.getUsers();
    return users;
  }
}
