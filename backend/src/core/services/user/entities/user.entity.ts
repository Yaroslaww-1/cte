import { IsString, IsUUID, IsOptional } from 'class-validator';
import * as bcrypt from 'bcryptjs';

import { BaseEntity } from '@src/core/abstraction/base-entity';
import { InvalidPasswordException } from '@src/core/exceptions/auth/invalid-password.exception';
import { makePasswordHash } from '../helpers/make-password-hash.helper';
import { WithoutFunctions } from '@shared/types';

class UserEntity extends BaseEntity<UserEntity> {
  @IsUUID(4)
  readonly id!: string;

  @IsString()
  readonly name!: string;

  @IsString()
  readonly email!: string;

  @IsString()
  readonly passwordHash!: string;

  @IsOptional()
  @IsString()
  readonly confirmEmailToken?: string;

  static async newWithoutPasswordHash(
    props: Omit<WithoutFunctions<UserEntity>, 'passwordHash' | 'id'> & { password: string },
  ): Promise<UserEntity> {
    const propsWithPasswordHash = {
      ...props,
      passwordHash: await makePasswordHash(props.password),
    };
    return await super.new(UserEntity, propsWithPasswordHash);
  }

  isPasswordEqual(password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, this.passwordHash, (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new InvalidPasswordException());
        return resolve(result);
      });
    });
  }
}

export { UserEntity };
