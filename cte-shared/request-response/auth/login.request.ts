import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Exclude()
class LoginRequest extends BaseDto<LoginRequest> {
  @Expose()
  @IsString()
  readonly email!: string;

  @Expose()
  @IsString()
  readonly password!: string;

  @Expose()
  @IsString()
  readonly fingerprint!: string;
}

export { LoginRequest };
