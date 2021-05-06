import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsUUID } from 'class-validator';
import { PatchOperation } from 'diff-match-patch-ts';

import { BaseDto } from '../../../abstraction/base-dto';

const UPDATE_DOCUMENT_CLIENT_EMIT_EVENT = 'update-document';

@Exclude()
class UpdateDocumentClientEmitPayload extends BaseDto<UpdateDocumentClientEmitPayload> {
  @Expose()
  @IsUUID(4)
  readonly documentId!: string;

  @Expose()
  @IsArray()
  readonly patchOperations!: PatchOperation[];
}

export { UPDATE_DOCUMENT_CLIENT_EMIT_EVENT, UpdateDocumentClientEmitPayload };
