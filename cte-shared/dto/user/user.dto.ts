import { Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Expose()
class UserDto extends BaseDto<UserDto> {
  @IsUUID(4)
  readonly id!: string;

  @IsString()
  readonly name!: string;

  @IsString()
  readonly email!: string;
}

export { UserDto };
