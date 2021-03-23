import { IsString, IsNumber, validateSync } from 'class-validator';

class LoginSuccessResponse {
  @IsString()
  readonly accessToken!: string;

  @IsString()
  readonly refreshToken!: string;

  @IsNumber()
  readonly refTokenExpiresInSeconds!: number;

  constructor(props: LoginSuccessResponse) {
    Object.assign(this, props);
    validateSync(this);
  }
}

export { LoginSuccessResponse };