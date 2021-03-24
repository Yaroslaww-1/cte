import { Injectable } from '@nestjs/common';
import { UserDto } from '@shared/dto';
import { ACCESS_TOKEN_EXPIRES_IN_MILLISECONDS, ACCESS_TOKEN_TYPE } from '../constants';
import { JwtService } from '../../shared/jwt.service';

@Injectable()
export class AccessTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async makeAccessToken(userDto: UserDto): Promise<string> {
    const config = {
      payload: {
        tokenType: ACCESS_TOKEN_TYPE,
        username: userDto.name,
        // TODO: uncomment
        // iss,
      },

      options: {
        algorithm: 'HS512',
        subject: userDto.id.toString(),
        expiresIn: ACCESS_TOKEN_EXPIRES_IN_MILLISECONDS,
      },
    };

    return await this.jwtService.sign(config.payload, config.options);
  }
}
