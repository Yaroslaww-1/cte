import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Expose()
export class UserDto {
  @IsNumber()
  readonly id!: number;

  @IsString()
  readonly name!: string;

  @IsString()
  readonly email!: string;

  constructor(props: UserDto) {
    Object.assign(this, props);
  }
}
