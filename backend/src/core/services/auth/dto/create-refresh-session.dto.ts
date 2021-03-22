import { IsString, IsUUID, IsIP, IsNumber } from 'class-validator';

class CreateRefreshSessionDto {
  @IsUUID(4)
  readonly refreshToken!: string;

  @IsString()
  readonly userId!: number;

  @IsString()
  readonly fingerprint!: string;

  @IsIP()
  readonly ip!: string;

  @IsNumber()
  readonly expiresIn!: number;

  @IsString()
  readonly userAgent: string | undefined;

  constructor(props: CreateRefreshSessionDto) {
    Object.assign(this, props);
  }
}

export { CreateRefreshSessionDto };
