import { v4 as uuidv4 } from 'uuid';
import { IsString, IsUUID, IsIP, IsNumber, validateSync } from 'class-validator';

class RefreshSessionEntity {
  @IsUUID(4)
  readonly refreshTokenId!: string;

  @IsNumber()
  readonly userId!: number;

  @IsString()
  readonly fingerprint!: string;

  @IsIP()
  readonly ip!: string;

  @IsNumber()
  readonly expiresIn!: number;

  @IsString()
  readonly userAgent?: string;

  constructor(props: Omit<RefreshSessionEntity, 'refreshTokenId'>) {
    Object.assign(this, {
      ...props,
      refreshTokenId: uuidv4(),
    });
    validateSync(this);
  }
}

export { RefreshSessionEntity };
