import { IsString, validateSync, IsNumber } from 'class-validator';

class UserEntity {
  @IsNumber()
  readonly id!: number;

  @IsString()
  readonly name!: string;

  @IsString()
  readonly email!: string;

  @IsString()
  readonly passwordHash!: string;

  @IsString()
  readonly emailConfirmToken?: string;

  constructor(props: UserEntity) {
    Object.assign(this, props);
    validateSync(this);
  }
}

export { UserEntity };
