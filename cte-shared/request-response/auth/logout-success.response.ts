import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Exclude()
class LogoutSuccessResponse extends BaseDto<LogoutSuccessResponse> {
  @Expose()
  @IsString()
  message!: string;
}

export { LogoutSuccessResponse };
