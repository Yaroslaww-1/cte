import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Expose()
class LoginRequest extends BaseDto<LoginRequest> {
  @IsString()
  readonly email!: string;

  @IsString()
  readonly password!: string;

  @IsString()
  readonly fingerprint!: string;
}

export { LoginRequest };
