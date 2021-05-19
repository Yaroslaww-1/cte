/* eslint-disable @typescript-eslint/ban-types */
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

const ERROR_SERVER_EMIT_EVENT = 'error';

import { BaseDto } from '../../../abstraction/base-dto';

@Exclude()
class ErrorServerEmit extends BaseDto<ErrorServerEmit> {
  @Expose()
  @IsString()
  readonly message!: string;
}

export { ERROR_SERVER_EMIT_EVENT, ErrorServerEmit };
