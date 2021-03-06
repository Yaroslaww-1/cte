import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWT_CONFIG } from '@src/config/config';
import { IJwtConfig } from '@src/config/jwt.config';
import { jwtVerify, jwtSign, JwtPayloadType, JwtSignOptions } from '@src/core/lib/jwt.lib';

@Injectable()
export class JwtService {
  private SECRET: string;

  constructor(private readonly configService: ConfigService) {
    const SECRET = this.configService.get<IJwtConfig>(JWT_CONFIG)?.SECRET;
    if (!SECRET) {
      throw new Error('Jwt secret is not set!');
    }
    this.SECRET = SECRET;
  }

  async verify<T>(token: string): Promise<T> {
    return await jwtVerify(this.SECRET)<T>(token);
  }

  async sign(payload: JwtPayloadType, options: JwtSignOptions): Promise<string> {
    return await jwtSign(this.SECRET)(payload, options);
  }
}
