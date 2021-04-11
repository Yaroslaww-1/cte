import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { AccessTokenPayloadDto } from '@shared/dto/auth';
import { JwtService } from '@src/core/services/shared/jwt.service';

@Injectable()
class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { accessTokenPayload: AccessTokenPayloadDto } = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const bearer = authorization && authorization.startsWith('BEARER ') ? authorization : null;
    const token = bearer ? bearer.split('BEARER ')[1] : null;

    if (!token) {
      return false;
    }

    const accessTokenPayload = new AccessTokenPayloadDto(await this.jwtService.verify(token));
    request.accessTokenPayload = accessTokenPayload;

    return true;
  }
}

export { AuthGuard };
