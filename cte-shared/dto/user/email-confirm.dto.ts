import { IsString, validateSync } from 'class-validator';

class EmailConfirmDto {
  @IsString()
  readonly emailConfirmToken!: string;

  constructor(props: EmailConfirmDto) {
    Object.assign(this, props);
    validateSync(this);
  }
}

export { EmailConfirmDto };
