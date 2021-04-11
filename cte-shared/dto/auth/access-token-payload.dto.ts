import { IsNumber, IsString, validateSync } from 'class-validator';
import { Expose } from 'class-transformer';

@Expose()
class AccessTokenPayloadDto {
  // TODO: check if we really need tokenType here
  @IsString()
  readonly tokenType!: string;

  @IsString()
  readonly username!: string;

  @IsNumber()
  readonly userId!: number;

  @IsNumber()
  readonly expiresIn!: number;

  // TODO: add iss property
  // iss,

  constructor(props: AccessTokenPayloadDto) {
    Object.assign(this, props);
    validateSync(this);
  }
}

export { AccessTokenPayloadDto };
