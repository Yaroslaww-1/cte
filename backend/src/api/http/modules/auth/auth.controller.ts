import { Controller, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
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
import { ConfigService } from '@nestjs/config';
import { IBackendApplicationConfig } from '@src/config/backend-application.config';
import { BACKEND_APPLICATION_CONFIG } from '@src/config/config';

@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly logoutService: LogoutService,
    private readonly refreshTokensService: RefreshTokensService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<LoginSuccessDto> {
    const userAgent = request.headers['user-agent'];
    const ip = request.ip;

    const loginSuccessResponse = await this.loginService.login(new LoginRequest({ ...loginDto, userAgent, ip }));
    const domain = this.configService.get<IBackendApplicationConfig>(BACKEND_APPLICATION_CONFIG)?.HOST;
    response.cookie('refreshTokenId', loginSuccessResponse.refreshTokenId, {
      domain,
      path: '/auth',
      maxAge: loginSuccessResponse.refTokenExpiresInSeconds,
      secure: false, // temp: should be deleted
    });

    return new LoginSuccessDto({
      accessToken: loginSuccessResponse.accessToken,
      refreshTokenId: loginSuccessResponse.refreshTokenId,
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
    @Res() response: Response,
  ): Promise<RefreshTokensSuccessDto> {
    const refreshTokenId = refreshTokensDto.refreshTokenId || request.cookies.refreshTokenId;
    const userAgent = request.headers['user-agent'];
    const ip = request.ip;

    const refreshTokensResponse = await this.refreshTokensService.refreshTokens(
      new RefreshTokensRequest({
        userAgent,
        ip,
        fingerprint: refreshTokensDto.fingerprint,
        refreshTokenId,
      }),
    );
    const domain = this.configService.get<IBackendApplicationConfig>(BACKEND_APPLICATION_CONFIG)?.HOST;
    response.cookie('refreshTokenId', refreshTokensResponse.refreshTokenId, {
      domain,
      path: '/auth',
      maxAge: refreshTokensResponse.refTokenExpiresInSeconds,
      secure: false, // temp: should be deleted
    });

    return new RefreshTokensSuccessDto({
      accessToken: refreshTokensResponse.accessToken,
      refreshTokenId: refreshTokensResponse.refreshTokenId,
    });
  }
}
