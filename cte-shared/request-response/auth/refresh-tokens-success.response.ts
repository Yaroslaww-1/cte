import { Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Expose()
class RefreshTokensSuccessResponse extends BaseDto<RefreshTokensSuccessResponse> {
  @IsString()
  readonly accessToken!: string;

  @IsUUID(4)
  readonly refreshTokenId!: string;
}

export { RefreshTokensSuccessResponse };
