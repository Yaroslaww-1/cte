import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Exclude()
export class LogoutRequest extends BaseDto<LogoutRequest> {
  @Expose()
  @IsOptional()
  @IsUUID(4)
  readonly refreshTokenId?: string;
}
