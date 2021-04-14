import { IsString } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

class ConfirmEmailRequest extends BaseDto<ConfirmEmailRequest> {
  @IsString()
  readonly confirmEmailToken!: string;
}

export { ConfirmEmailRequest };
