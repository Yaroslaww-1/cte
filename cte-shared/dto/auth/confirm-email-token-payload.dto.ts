import { IsString, IsUUID } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

class ConfirmEmailTokenPayloadDto extends BaseDto<ConfirmEmailTokenPayloadDto> {
  @IsString()
  readonly tokenType!: string;

  @IsUUID(4)
  readonly userId!: string;

  @IsString()
  readonly newEmail!: string;
}

export { ConfirmEmailTokenPayloadDto };
