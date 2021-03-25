import { IsString, validateSync } from 'class-validator';

class LoginSuccessDto {
  @IsString()
  readonly accessToken!: string;

  @IsString()
  readonly refreshTokenId!: string;

  constructor(props: LoginSuccessDto) {
    Object.assign(this, props);
    validateSync(this);
  }
}

export { LoginSuccessDto };
