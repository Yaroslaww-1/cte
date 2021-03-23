import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Expose()
export class OkDto {
  @IsString()
  readonly message!: string;

  constructor(props: OkDto) {
    Object.assign(this, props);
  }
}
