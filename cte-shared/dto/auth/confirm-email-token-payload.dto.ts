import { Exclude, Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Exclude()
class ConfirmEmailTokenPayloadDto extends BaseDto<ConfirmEmailTokenPayloadDto> {
  @Expose()
  @IsString()
  readonly tokenType!: string;

  @Expose()
  @IsUUID(4)
  readonly userId!: string;

  @Expose()
  @IsString()
  readonly newEmail!: string;
}

export { ConfirmEmailTokenPayloadDto };
