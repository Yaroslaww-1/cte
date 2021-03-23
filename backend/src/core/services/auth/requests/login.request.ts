import { LoginDto } from '@shared/dto';
import { IsString, IsIP } from 'class-validator';

class LoginRequest extends LoginDto {
  @IsIP()
  readonly ip!: string;

  @IsString()
  readonly userAgent: string | undefined;

  constructor(props: LoginRequest) {
    super(props);
    Object.assign(this, props);
  }
}

export { LoginRequest };
