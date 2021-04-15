import { Controller, Post, Body, Req, Res, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

import { IBackendApplicationConfig } from '@src/config/backend-application.config';
import { BACKEND_APPLICATION_CONFIG } from '@src/config/config';
import { LoginUsecase } from '@src/core/services/auth/usecases/login.usecase';
import { LogoutUsecase } from '@src/core/services/auth/usecases/logout.usecase';
import { RefreshTokensUsecase } from '@src/core/services/auth/usecases/refresh-tokens.usecase';
import {
  LoginRequest,
  LoginSuccessResponse,
  LogoutRequest,
  LogoutSuccessResponse,
  RefreshTokensRequest,
  RefreshTokensSuccessResponse,
} from '@shared/request-response';
import { LoginDto } from '@src/core/services/auth/dto/login.dto';
import { RefreshTokensDto } from '@src/core/services/auth/dto/refresh-tokens.dto';

@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(
    private readonly loginUsecase: LoginUsecase,
    private readonly logoutUsecase: LogoutUsecase,
    private readonly refreshTokensUsecase: RefreshTokensUsecase,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  async login(
    @Body() request: LoginRequest,
    @Req() httpRequest: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginSuccessResponse> {
    const userAgent = httpRequest.headers['user-agent'];
    const ip = httpRequest.ip;

    const loginDto = await LoginDto.new(LoginDto, { ...request, userAgent, ip });

    const loginSuccessResponse = await this.loginUsecase.execute(loginDto);
    const domain = this.configService.get<IBackendApplicationConfig>(BACKEND_APPLICATION_CONFIG)?.HOST;
    response.cookie('refreshTokenId', loginSuccessResponse.refreshTokenId, {
      domain,
      path: '/api/auth',
      maxAge: loginSuccessResponse.refTokenExpiresInSeconds,
      secure: false, // temp: should be deleted
    });

    return await LoginSuccessResponse.new(LoginSuccessResponse, {
      accessToken: loginSuccessResponse.accessToken,
      refreshTokenId: loginSuccessResponse.refreshTokenId,
    });
  }

  @Post('logout')
  async logout(@Body() request: LogoutRequest, @Req() httpRequest: Request): Promise<LogoutSuccessResponse> {
    const refreshTokenId = request.refreshTokenId || httpRequest.cookies.refreshTokenId;
    return await this.logoutUsecase.execute(refreshTokenId);
  }

  @Post('refresh-tokens')
  async refreshTokens(
    @Body() request: RefreshTokensRequest,
    @Req() httpRequest: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<RefreshTokensSuccessResponse> {
    const refreshTokenId = request.refreshTokenId || httpRequest.cookies.refreshTokenId;
    const userAgent = httpRequest.headers['user-agent'];
    const ip = httpRequest.ip;

    const refreshTokensDto = await RefreshTokensDto.new(RefreshTokensDto, {
      userAgent,
      ip,
      fingerprint: request.fingerprint,
      refreshTokenId,
    });
    const refreshTokensResponse = await this.refreshTokensUsecase.execute(refreshTokensDto);

    const domain = this.configService.get<IBackendApplicationConfig>(BACKEND_APPLICATION_CONFIG)?.HOST;
    response.cookie('refreshTokenId', refreshTokensResponse.refreshTokenId, {
      domain,
      path: '/api/auth',
      maxAge: refreshTokensResponse.refTokenExpiresInSeconds,
      secure: false, // TODO: should be deleted
    });

    return await RefreshTokensSuccessResponse.new(RefreshTokensSuccessResponse, {
      accessToken: refreshTokensResponse.accessToken,
      refreshTokenId: refreshTokensResponse.refreshTokenId,
    });
  }
}
