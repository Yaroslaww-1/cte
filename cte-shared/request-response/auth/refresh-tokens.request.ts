import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Expose()
export class RefreshTokensRequest extends BaseDto<RefreshTokensRequest> {
  @IsString()
  readonly fingerprint!: string;

  @IsOptional()
  @IsUUID(4)
  readonly refreshTokenId?: string;
}
