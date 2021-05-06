import { Exclude, Expose } from 'class-transformer';
import { IsObject, IsString, IsUUID, IsArray } from 'class-validator';

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

  @Expose()
  @IsString()
  readonly createdDate!: string;

  @Expose()
  @IsArray()
  contributors!: string[];

  @Expose()
  @IsString()
  modifiedDate!: string;
}

export { DocumentDto };
