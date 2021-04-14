import { IsString, IsNumber } from 'class-validator';

import { BaseDto } from '@shared/abstraction/base-dto';

class LoginSuccessDto extends BaseDto<LoginSuccessDto> {
  @IsString()
  readonly accessToken!: string;

  @IsString()
  readonly refreshTokenId!: string;

  @IsNumber()
  readonly refTokenExpiresInSeconds!: number;
}

export { LoginSuccessDto };
