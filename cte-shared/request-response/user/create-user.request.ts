import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Expose()
class CreateUserRequest extends BaseDto<CreateUserRequest> {
  @IsString()
  readonly name!: string;

  @IsString()
  readonly email!: string;

  @IsString()
  readonly password!: string;
}

export { CreateUserRequest };
