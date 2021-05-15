import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Exclude()
class GoogleUserRequest extends BaseDto<GoogleUserRequest> {
  @Expose()
  @IsString()
  readonly name!: string;

  @Expose()
  @IsString()
  readonly email!: string;
}

export { GoogleUserRequest };
