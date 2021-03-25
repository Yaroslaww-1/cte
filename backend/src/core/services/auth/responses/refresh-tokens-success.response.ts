import { IsString, IsNumber, validateSync } from 'class-validator';

class RefreshTokensSuccessResponse {
  @IsString()
  readonly accessToken!: string;

  @IsString()
  readonly refreshTokenId!: string;

  @IsNumber()
  readonly refTokenExpiresInSeconds!: number;

  constructor(props: RefreshTokensSuccessResponse) {
    Object.assign(this, props);
    validateSync(this);
  }
}

export { RefreshTokensSuccessResponse };
