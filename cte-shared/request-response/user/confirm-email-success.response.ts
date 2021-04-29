import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Exclude()
class ConfirmEmailSuccessResponse extends BaseDto<ConfirmEmailSuccessResponse> {
  @Expose()
  @IsString()
  message!: string;
}

export { ConfirmEmailSuccessResponse };
