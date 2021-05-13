import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '@shared/dto';
import { GoogleCreateUserUsecase } from '@src/core/services/user/usecases/google-create-user.usecase';

@Controller('google-auth')
export class GoogleAuthController {
  constructor(private readonly googleCreateUserUsecase: GoogleCreateUserUsecase) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth(@Req() req: unknown): Promise<void> {}

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  googleAuthRedirect(@Req() req: any): Promise<UserDto> {
    return this.googleCreateUserUsecase.execute({
      name: req.user.firstName + ' ' + req.user.lastName,
      email: req.user.email,
    });
  }
}
