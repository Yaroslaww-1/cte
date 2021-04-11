import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@Expose()
export class RefreshTokensDto {
  @IsString()
  readonly fingerprint!: string;

  @IsOptional()
  @IsString()
  readonly refreshTokenId?: string;

  constructor(props: RefreshTokensDto) {
    Object.assign(this, props);
  }
}
