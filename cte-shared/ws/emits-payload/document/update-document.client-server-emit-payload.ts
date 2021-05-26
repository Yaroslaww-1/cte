import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsUUID } from 'class-validator';
import { PatchOperation } from 'diff-match-patch-ts';

import { BaseDto } from '../../../abstraction/base-dto';

const UPDATE_DOCUMENT_CLIENT_SERVER_EMIT_EVENT = 'update-document';

@Exclude()
class UpdateDocumentClientServerEmitPayload extends BaseDto<UpdateDocumentClientServerEmitPayload> {
  @Expose()
  @IsUUID(4)
  readonly userId!: string;

  @Expose()
  @IsUUID(4)
  readonly documentId!: string;

  @Expose()
  @IsArray()
  @Type(() => PatchOperation)
  readonly patchOperations!: PatchOperation[];
}

export { UPDATE_DOCUMENT_CLIENT_SERVER_EMIT_EVENT, UpdateDocumentClientServerEmitPayload };
