import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Exclude()
class UpdateUserRequest extends BaseDto<UpdateUserRequest> {
  @Expose()
  @IsOptional()
  @IsString()
  readonly name?: string;

  @Expose()
  @IsOptional()
  @IsString()
  readonly email?: string;
}

export { UpdateUserRequest };
