import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString, IsUUID } from 'class-validator';

import { BaseDto } from '../../abstraction/base-dto';

@Exclude()
class AccessTokenPayloadDto extends BaseDto<AccessTokenPayloadDto> {
  // TODO: check if we really need tokenType here
  @Expose()
  @IsString()
  readonly tokenType!: string;

  @Expose()
  @IsString()
  readonly username!: string;

  @Expose()
  @IsUUID(4)
  readonly userId!: string;

  @Expose()
  @IsNumber()
  readonly expiresInMs!: number;

  // TODO: add iss property
  // iss,
}

export { AccessTokenPayloadDto };
