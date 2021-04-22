import { Exclude, Expose } from 'class-transformer';
import { IsObject, IsString, IsUUID } from 'class-validator';

import { UserDto } from '../user';
import { BaseDto } from '../../abstraction/base-dto';

@Exclude()
class DocumentDto extends BaseDto<DocumentDto> {
  @Expose()
  @IsUUID(4)
  readonly id!: string;

  @Expose()
  @IsString()
  readonly title!: string;

  @Expose()
  @IsObject()
  readonly user!: UserDto;
}

export { DocumentDto };
