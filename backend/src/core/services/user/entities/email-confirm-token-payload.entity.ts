import { IsString, validateSync, IsNumber } from 'class-validator';

class EmailConfirmTokenPayloadEntity {
  @IsString()
  readonly tokenType!: string;

  @IsNumber()
  readonly userId!: number;

  @IsString()
  readonly newEmail!: string;

  constructor(props: EmailConfirmTokenPayloadEntity) {
    Object.assign(this, props);
    validateSync(this);
  }
}

export { EmailConfirmTokenPayloadEntity };
