import { Controller, Get, UseGuards, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { LoginSuccessResponse } from '@shared/request-response';
import { IBackendApplicationConfig } from '@src/config/backend-application.config';
import { BACKEND_APPLICATION_CONFIG } from '@src/config/config';
import { GoogleCreateOrLoginUserUsecase } from '@src/core/services/google-auth/usecases/google-create-or-login-user.usecase';
import { Response } from 'express';

@Controller('google-auth')
export class GoogleAuthController {
  constructor(
    private configService: ConfigService,
    private readonly googleCreateUserUsecase: GoogleCreateOrLoginUserUsecase,
  ) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth(@Req() req: unknown): Promise<void> {}

  @Post('callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Req() req: Request & { user: any },
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginSuccessResponse> {
    const loginSuccessResponse = await this.googleCreateUserUsecase.execute(req, {
      name: req.user.firstName + ' ' + req.user.lastName,
      email: req.user.email,
    });

    const domain = this.configService.get<IBackendApplicationConfig>(BACKEND_APPLICATION_CONFIG)?.BACKEND_COOKIE_DOMAIN;
    console.log(loginSuccessResponse.refreshTokenId);
    response.cookie('refreshTokenId', loginSuccessResponse.refreshTokenId, {
      domain,
      path: '/api',
      maxAge: loginSuccessResponse.refTokenExpiresInSeconds,
      secure: false,
    });

    return await LoginSuccessResponse.new(LoginSuccessResponse, {
      accessToken: loginSuccessResponse.accessToken,
      refreshTokenId: loginSuccessResponse.refreshTokenId,
    });
  }
}
