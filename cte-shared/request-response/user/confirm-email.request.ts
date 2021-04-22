import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Exclude()
class ConfirmEmailRequest extends BaseDto<ConfirmEmailRequest> {
  @Expose()
  @IsString()
  readonly confirmEmailToken!: string;
}

export { ConfirmEmailRequest };
