import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Exclude()
export class RefreshTokensRequest extends BaseDto<RefreshTokensRequest> {
  @Expose()
  @IsString()
  readonly fingerprint!: string;

  @Expose()
  @IsOptional()
  @IsUUID(4)
  readonly refreshTokenId?: string;
}
