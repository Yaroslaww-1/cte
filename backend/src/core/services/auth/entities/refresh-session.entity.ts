import { v4 as uuidv4 } from 'uuid';
import { IsString, IsUUID, IsIP, IsNumber, IsOptional } from 'class-validator';

import { BaseEntity } from '@src/core/abstraction/base-entity';
import { SessionExpiredException } from '@src/core/exceptions/auth/session-expired.exception';
import { InvalidRefreshSessionException } from '@src/core/exceptions/auth/invalid-refresh-session.exception';
import { WithoutFunctions } from '@shared/types';

class RefreshSessionEntity extends BaseEntity<RefreshSessionEntity> {
  @IsUUID(4)
  readonly id!: string;

  @IsUUID(4)
  readonly refreshTokenId!: string;

  @IsUUID(4)
  readonly userId!: string;

  @IsString()
  readonly fingerprint!: string;

  @IsIP()
  readonly ip!: string;

  @IsNumber()
  readonly expiresIn!: number;

  @IsOptional()
  @IsString()
  readonly userAgent?: string;

  static async newWithoutRefreshTokenId(
    props: Omit<WithoutFunctions<RefreshSessionEntity>, 'refreshTokenId' | 'id'>,
  ): Promise<RefreshSessionEntity> {
    return await RefreshSessionEntity.new(RefreshSessionEntity, {
      ...props,
      refreshTokenId: uuidv4(),
    });
  }

  async verifyFingerprint(newFingerprint: string): Promise<void> {
    const nowTime = new Date().getTime();

    if (nowTime > this.expiresIn) {
      throw new SessionExpiredException();
    }
    // if (oldIp !== newIp) throw Exception // for best security
    if (this.fingerprint !== newFingerprint) {
      throw new InvalidRefreshSessionException();
    }
  }
}

export { RefreshSessionEntity };
