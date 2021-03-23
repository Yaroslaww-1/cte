import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import {
  LoginDto,
  LoginSuccessDto,
  LogoutDto,
  LogoutSuccessDto,
  RefreshTokensDto,
  RefreshTokensSuccessDto,
} from '@shared/dto';
import { LoginRequest } from '@src/core/services/auth/requests/login.request';
import { RefreshTokensRequest } from '@src/core/services/auth/requests/refresh-tokens.request';
import { LoginService } from '@src/core/services/auth/login.service';
import { LogoutService } from '@src/core/services/auth/logout.service';
import { RefreshTokensService } from '@src/core/services/auth/refresh-token.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly logoutService: LogoutService,
    private readonly refreshTokensService: RefreshTokensService
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<LoginSuccessDto> {
    const userAgent = request.headers['user-agent'];
    const ip = request.ip;

    const loginSuccessResponse = await this.loginService.login(new LoginRequest({ ...loginDto, userAgent, ip }));
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

  @Post('logout')
  async logout(@Body() logoutDto: LogoutDto, @Req() request: Request): Promise<LogoutSuccessDto> {
    const refreshToken = logoutDto.refreshToken || request.cookies.refreshToken;
    return await this.logoutService.logout(refreshToken);
  }

  @Post('refresh-tokens')
  async refreshTokens(
    @Body() refreshTokensDto: RefreshTokensDto,
    @Req() request: Request,
    @Res() response: Response
  ): Promise<RefreshTokensSuccessDto> {
    const refreshToken = refreshTokensDto.refreshToken || request.cookies.refreshToken;
    const userAgent = request.headers['user-agent'];
    const ip = request.ip;

    const refreshTokensResponse = await this.refreshTokensService.refreshTokens(
      new RefreshTokensRequest({
        userAgent,
        ip,
        fingerprint: refreshTokensDto.fingerprint,
        refreshToken,
      })
    );
    response.cookie('refreshToken', refreshTokensResponse.refreshToken, {
      domain: 'localhost',
      path: '/auth',
      maxAge: refreshTokensResponse.refTokenExpiresInSeconds,
      secure: false, // temp: should be deleted
    });

    return new RefreshTokensSuccessDto({
      accessToken: refreshTokensResponse.accessToken,
      refreshToken: refreshTokensResponse.refreshToken,
    });
  }
}
