import { Controller, Get, Post, Param, Body, ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { AccessTokenPayloadDto, UserDto } from '@shared/dto';
import { ConfirmEmailRequest, ConfirmEmailSuccessResponse, CreateUserRequest } from '@shared/request-response';
import { AccessTokenPayload } from '@src/api/decorators/access-token-payload.decorator';
import { AuthGuard } from '@src/api/guards/auth.guard';
import { ConfirmEmailUsecase } from '@src/core/services/user/usecases/confirm-email.usecase';
import { CreateUserUsecase } from '@src/core/services/user/usecases/create-user.usecase';
import { GetUserUsecase } from '@src/core/services/user/usecases/get-user.usecase';
import { GetUsersUsecase } from '@src/core/services/user/usecases/get-users.usecase';

@Controller('users')
export class UserController {
  constructor(
    private readonly getUsersUsecase: GetUsersUsecase,
    private readonly getUserUsecase: GetUserUsecase,
    private readonly createUserUsecase: CreateUserUsecase,
    private readonly confirmEmailUsecase: ConfirmEmailUsecase,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUsers(): Promise<UserDto[]> {
    return await this.getUsersUsecase.execute();
  }

  @Get('current')
  @UseGuards(AuthGuard)
  async getCurrentUser(@AccessTokenPayload() accessTokenPayload: AccessTokenPayloadDto): Promise<UserDto> {
    return await this.getUserUsecase.execute(accessTokenPayload.userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto> {
    return await this.getUserUsecase.execute(id);
  }

  @Post()
  async createNewUser(@Body() request: CreateUserRequest): Promise<UserDto> {
    return await this.createUserUsecase.execute(request);
  }

  @Post('confirm-email')
  async confirmEmail(@Body() body: ConfirmEmailRequest): Promise<ConfirmEmailSuccessResponse> {
    return await this.confirmEmailUsecase.execute(body);
  }
}
