import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Exclude()
class GoogleCreateUserRequest extends BaseDto<GoogleCreateUserRequest> {
  @Expose()
  @IsString()
  readonly name!: string;

  @Expose()
  @IsString()
  readonly email!: string;
}

export { GoogleCreateUserRequest };
