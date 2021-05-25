import { Type } from 'class-transformer';
import { IsString, IsUUID, IsObject, IsDate } from 'class-validator';

import { BaseEntity } from '@src/core/abstraction/base-entity';
import { UserEntity } from '../../user/entities/user.entity';

class DocumentEntity extends BaseEntity {
  @IsUUID(4)
  readonly id!: string;

  @IsString()
  readonly title!: string;

  @IsString()
  content!: string;

  @IsObject()
  @Type(() => UserEntity)
  readonly user!: UserEntity;

  @IsDate()
  readonly createdDate!: Date;

  @IsDate()
  modifiedDate!: Date;

  static async newWithDefaults(props: { title: string; content?: string; user: UserEntity }): Promise<DocumentEntity> {
    props.content = '';
    return await super.new(DocumentEntity, props as DocumentEntity);
  }
}

export { DocumentEntity };
