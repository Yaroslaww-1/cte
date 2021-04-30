import { IsString, IsUUID, IsObject, ValidateNested } from 'class-validator';

import { BaseEntity } from '@src/core/abstraction/base-entity';
import { UserDto } from '@shared/dto';

class DocumentEntity extends BaseEntity<DocumentEntity> {
  @IsUUID(4)
  readonly id!: string;

  @IsString()
  readonly title!: string;

  @IsObject()
  @ValidateNested()
  readonly user!: UserDto;
}

export { DocumentEntity };
