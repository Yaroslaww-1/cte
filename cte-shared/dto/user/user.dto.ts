import { Exclude, Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Exclude()
class UserDto extends BaseDto<UserDto> {
  @Expose()
  @IsUUID(4)
  readonly id!: string;

  @Expose()
  @IsString()
  readonly name!: string;

  @Expose()
  @IsString()
  readonly email!: string;
}

export { UserDto };
