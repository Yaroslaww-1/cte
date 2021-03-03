import { Controller, Get, Post, Param, Body } from '@nestjs/common';
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
  async getUserById(@Param('id') id: string): Promise<UserDto[]> {
    return await this.userService.getUserById(Number(id));
  }

  @Post()
  async createNewUser(@Body() createUserDto: CreateUserDto): Promise<UserDto[]> {
    return await this.userService.createNewUser(createUserDto);
  }
}
