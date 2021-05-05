import { Exclude, Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

import { BaseDto } from '../../../abstraction/base-dto';

const START_EDITING_DOCUMENT_CLIENT_EMIT_EVENT = 'start-editing';

@Exclude()
class StartEditingDocumentClientEmitPayload extends BaseDto<StartEditingDocumentClientEmitPayload> {
  @Expose()
  @IsUUID(4)
  readonly userId!: string;
}

export { START_EDITING_DOCUMENT_CLIENT_EMIT_EVENT, StartEditingDocumentClientEmitPayload };
