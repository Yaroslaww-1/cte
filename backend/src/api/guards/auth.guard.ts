import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { AccessTokenPayloadDto } from '@shared/dto/auth';
import { JwtService } from '@src/core/services/shared/jwt.service';
import { WithoutFunctions } from '@shared/types';

@Injectable()
class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { accessTokenPayload: AccessTokenPayloadDto } = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const bearerPattern = new RegExp('^' + 'bearer ', 'i');
    const isAuthorizationExists = bearerPattern.test(authorization ?? '');

    if (!isAuthorizationExists) {
      return false;
    }

    const token = authorization?.split(bearerPattern)[1];

    if (!token) {
      return false;
    }

    const tokenPayload = await this.jwtService.verify<WithoutFunctions<AccessTokenPayloadDto>>(token);

    const accessTokenPayload = await AccessTokenPayloadDto.new(AccessTokenPayloadDto, tokenPayload);

    request.accessTokenPayload = accessTokenPayload;

    return true;
  }
}

export { AuthGuard };
