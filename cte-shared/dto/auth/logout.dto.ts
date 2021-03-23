import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class LogoutDto {
  @IsString()
  readonly refreshToken?: string;

  constructor(props: LogoutDto) {
    Object.assign(this, props);
  }
}
