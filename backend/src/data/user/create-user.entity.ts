import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class CreateUserEntity {
  @IsString()
  readonly name: string;

  constructor(props: CreateUserEntity) {
    Object.assign(this, props);
  }
}