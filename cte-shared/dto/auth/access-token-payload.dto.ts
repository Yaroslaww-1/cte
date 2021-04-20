import { IsNumber, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';

import { BaseDto } from '../../abstraction/base-dto';

@Expose()
class AccessTokenPayloadDto extends BaseDto<AccessTokenPayloadDto> {
  // TODO: check if we really need tokenType here
  @IsString()
  readonly tokenType!: string;

  @IsString()
  readonly username!: string;

  @IsUUID(4)
  readonly userId!: string;

  @IsNumber()
  readonly expiresInMs!: number;

  // TODO: add iss property
  // iss,
}

export { AccessTokenPayloadDto };
