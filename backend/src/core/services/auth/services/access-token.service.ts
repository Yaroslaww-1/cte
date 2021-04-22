import { Injectable } from '@nestjs/common';
import { classToPlain } from 'class-transformer';

import { AccessTokenPayloadDto, UserDto } from '@shared/dto';
import { ACCESS_TOKEN_LIFETIME_IN_SECONDS, ACCESS_TOKEN_TYPE } from '../constants';
import { JwtService } from '../../shared/jwt.service';

@Injectable()
export class AccessTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async makeAccessToken(userDto: UserDto): Promise<string> {
    const payload = new AccessTokenPayloadDto({
      tokenType: ACCESS_TOKEN_TYPE,
      username: userDto.name,
      userId: userDto.id,
      expiresInMs: new Date().getTime() + ACCESS_TOKEN_LIFETIME_IN_SECONDS * 1000,
    });
    const config = {
      payload: classToPlain(payload),

      options: {
        algorithm: 'HS512',
        subject: userDto.id.toString(),
        expiresIn: ACCESS_TOKEN_LIFETIME_IN_SECONDS,
      },
    };

    return await this.jwtService.sign(config.payload, config.options);
  }
}
