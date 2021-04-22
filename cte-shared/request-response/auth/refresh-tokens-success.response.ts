import { Exclude, Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Exclude()
class RefreshTokensSuccessResponse extends BaseDto<RefreshTokensSuccessResponse> {
  @Expose()
  @IsString()
  readonly accessToken!: string;

  @Expose()
  @IsUUID(4)
  readonly refreshTokenId!: string;
}

export { RefreshTokensSuccessResponse };
