import { BaseDto } from '@shared/abstraction/base-dto';
import { IsString, IsIP, IsUUID, IsOptional } from 'class-validator';

class RefreshTokensDto extends BaseDto<RefreshTokensDto> {
  @IsUUID(4)
  readonly refreshTokenId!: string;

  @IsString()
  readonly fingerprint!: string;

  @IsIP()
  readonly ip!: string;

  @IsOptional()
  @IsString()
  readonly userAgent?: string;
}

export { RefreshTokensDto };
