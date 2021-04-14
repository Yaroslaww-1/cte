import { IsString } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

class ConfirmEmailSuccessResponse extends BaseDto<ConfirmEmailSuccessResponse> {
  @IsString()
  message!: string;
}

export { ConfirmEmailSuccessResponse };
