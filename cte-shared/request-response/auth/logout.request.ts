import { Expose } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Expose()
export class LogoutRequest extends BaseDto<LogoutRequest> {
  @IsOptional()
  @IsUUID(4)
  readonly refreshTokenId?: string;
}
