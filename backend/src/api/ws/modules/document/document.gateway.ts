import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { UseFilters, UsePipes } from '@nestjs/common';
import * as WebSocket from 'ws';

import { StartEditingDocumentClientEmit } from '@shared/ws/emits';
import { WsExceptionsFilter } from '@src/api/exception-filters/ws.exception-filter';
import { ConfiguredValidationPipe } from '@src/api/pipes/configured-validation-pipe';

@WebSocketGateway(8080, { path: '/documents' })
@UsePipes(ConfiguredValidationPipe.new())
@UseFilters(new WsExceptionsFilter())
class DocumentsGateway {
  @SubscribeMessage('start-editing')
  async startEditing(
    @MessageBody() data: StartEditingDocumentClientEmit,
    @ConnectedSocket() client: WebSocket,
  ): Promise<void> {
    console.log('data', data);
  }
}

export { DocumentsGateway };
