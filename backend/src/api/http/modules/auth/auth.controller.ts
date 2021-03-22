import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { LoginDto, LoginSuccessDto } from '@shared/dto';
import { LoginRequestParamsDto } from '@src/core/services/auth/dto/login-request-params.dto';
import { LoginService } from '@src/core/services/auth/login.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<LoginSuccessDto> {
    const userAgent = request.headers['user-agent'];
    const ip = request.ip;

    const loginSuccessResponse = await this.loginService.login(loginDto, new LoginRequestParamsDto({ userAgent, ip }));
    response.cookie('refreshToken', loginSuccessResponse.refreshToken, {
      domain: 'localhost',
      path: '/auth',
      maxAge: loginSuccessResponse.refTokenExpiresInSeconds,
      secure: false, // temp: should be deleted
    });

    return new LoginSuccessDto({
      accessToken: loginSuccessResponse.accessToken,
      refreshToken: loginSuccessResponse.refreshToken,
    });
  }
}
