import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class RefreshTokensDto {
  @IsString()
  readonly fingerprint!: string;

  @IsString()
  readonly refreshTokenId?: string;

  constructor(props: RefreshTokensDto) {
    Object.assign(this, props);
  }
}