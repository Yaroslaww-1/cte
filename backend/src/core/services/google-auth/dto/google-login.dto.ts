import { IsString } from 'class-validator';

import { BaseDto } from '@shared/abstraction/base-dto';

class GoogleLoginDto extends BaseDto<GoogleLoginDto> {
  @IsString()
  readonly name!: string;

  @IsString()
  readonly email!: string;
}

export { GoogleLoginDto };
