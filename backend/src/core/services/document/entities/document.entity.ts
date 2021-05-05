import { IsString, IsUUID, IsObject } from 'class-validator';

import { BaseEntity } from '@src/core/abstraction/base-entity';
import { UserEntity } from '../../user/entities/user.entity';

class DocumentEntity extends BaseEntity {
  @IsUUID(4)
  readonly id!: string;

  @IsString()
  readonly title!: string;

  @IsString()
  readonly content!: string;

  @IsObject()
  readonly user!: UserEntity;

  static async newWithDefaults(props: { title: string; content?: string; user: UserEntity }): Promise<DocumentEntity> {
    props.content = '';
    return await super.new(DocumentEntity, props as DocumentEntity);
  }
}

export { DocumentEntity };
