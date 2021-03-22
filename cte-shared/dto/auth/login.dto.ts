import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class LoginDto {
  @IsString()
  readonly email!: string;

  @IsString()
  readonly password!: string;

  @IsString()
  readonly fingerprint!: string;

  constructor(props: LoginDto) {
    Object.assign(this, props);
  }
}
