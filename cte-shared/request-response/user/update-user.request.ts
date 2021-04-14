import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Expose()
class UpdateUserRequest extends BaseDto<UpdateUserRequest> {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsString()
  readonly email?: string;
}

export { UpdateUserRequest };
