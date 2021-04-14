import { Expose } from 'class-transformer';
import { IsObject, IsString, IsUUID } from 'class-validator';

import { UserDto } from '../user';
import { BaseDto } from '../../abstraction/base-dto';

@Expose()
class DocumentDto extends BaseDto<DocumentDto> {
  @IsUUID(4)
  readonly id!: string;

  @IsString()
  readonly title!: string;

  @IsObject()
  readonly user!: UserDto;
}

export { DocumentDto };
