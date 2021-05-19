import { IsUUID, IsInstance } from 'class-validator';
import * as WebSocket from 'ws';

import { BaseDto } from '@shared/abstraction/base-dto';

class StartEditingDocumentDto extends BaseDto<StartEditingDocumentDto> {
  @IsUUID(4)
  readonly userId!: string;

  @IsUUID(4)
  readonly documentId!: string;

  @IsInstance(WebSocket)
  readonly websocket!: WebSocket;
}

export { StartEditingDocumentDto };
