import { IsString, IsIP } from 'class-validator';

class LoginRequestParamsDto {
  @IsIP()
  readonly ip!: string;

  @IsString()
  readonly userAgent: string | undefined;

  constructor(props: LoginRequestParamsDto) {
    Object.assign(this, props);
  }
}

export { LoginRequestParamsDto };
