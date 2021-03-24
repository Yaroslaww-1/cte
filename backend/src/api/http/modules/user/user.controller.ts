import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { EmailConfirmDto, EmailConfirmSuccessDto, UpdateUserDto, UserDto } from '@shared/dto';
import { UserService } from '@core/services/user/user.service';
import { CreateUserDto } from '@shared/dto';
import { EmailConfirmService } from '@src/core/services/user/services/email-confirm.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly emailConfirmService: EmailConfirmService) {}

  @Get()
  async getUsers(): Promise<UserDto[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserDto> {
    return await this.userService.getUser({ id });
  }

  @Post()
  async createNewUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.createNewUser(createUserDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: number): Promise<void> {
    return await this.userService.deleteUserById(id);
  }

  @Patch(':id')
  async updateUserById(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    return await this.userService.updateUserById(id, updateUserDto);
  }

  @Post('email-confirm')
  async confirmEmail(@Body() emailConfirmDto: EmailConfirmDto): Promise<EmailConfirmSuccessDto> {
    return await this.emailConfirmService.confirmEmail(emailConfirmDto);
  }
}
