import { IsString, IsIP, IsUUID } from 'class-validator';

class RefreshTokensRequest {
  @IsUUID(4)
  readonly refreshToken!: string;

  @IsString()
  readonly fingerprint!: string;

  @IsIP()
  readonly ip!: string;

  @IsString()
  readonly userAgent?: string;

  constructor(props: RefreshTokensRequest) {
    Object.assign(this, props);
  }
}

export { RefreshTokensRequest };
