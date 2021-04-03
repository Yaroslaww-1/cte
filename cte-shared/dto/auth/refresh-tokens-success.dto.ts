import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class RefreshTokensSuccessDto {
  @IsString()
  readonly accessToken!: string;

  @IsString()
  readonly refreshTokenId!: string;

  constructor(props: RefreshTokensSuccessDto) {
    Object.assign(this, props);
  }
}