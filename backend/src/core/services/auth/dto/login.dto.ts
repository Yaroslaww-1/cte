import { IsString, IsIP, IsOptional } from 'class-validator';

import { BaseDto } from '@shared/abstraction/base-dto';

class LoginDto extends BaseDto<LoginDto> {
  @IsString()
  readonly email!: string;

  @IsString()
  readonly password!: string;

  @IsString()
  readonly fingerprint!: string;

  @IsIP()
  readonly ip!: string;

  @IsOptional()
  @IsString()
  readonly userAgent?: string;
}

export { LoginDto };
