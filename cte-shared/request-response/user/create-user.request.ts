import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Exclude()
class CreateUserRequest extends BaseDto<CreateUserRequest> {
  @Expose()
  @IsString()
  readonly name!: string;

  @Expose()
  @IsString()
  readonly email!: string;

  @Expose()
  @IsString()
  readonly password!: string;
}

export { CreateUserRequest };
