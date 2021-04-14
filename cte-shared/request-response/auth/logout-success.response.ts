import { IsString } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

class LogoutSuccessResponse extends BaseDto<LogoutSuccessResponse> {
  @IsString()
  message!: string;
}

export { LogoutSuccessResponse };
