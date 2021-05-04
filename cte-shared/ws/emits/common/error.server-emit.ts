/* eslint-disable @typescript-eslint/ban-types */
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { BaseDto } from '../../../abstraction/base-dto';

@Exclude()
class ErrorServerEmit extends BaseDto<ErrorServerEmit> {
  @Expose()
  @IsString()
  readonly message!: string;
}

export { ErrorServerEmit };
