import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { UseFilters, UsePipes } from '@nestjs/common';
import * as WebSocket from 'ws';

import {
  StartEditingDocumentClientEmitPayload,
  START_EDITING_DOCUMENT_CLIENT_EMIT_EVENT,
  UpdateDocumentClientEmitPayload,
  UPDATE_DOCUMENT_CLIENT_EMIT_EVENT,
} from '@shared/ws/emits-payload';
import { WsExceptionsFilter } from '@src/api/exception-filters/ws.exception-filter';
import { ConfiguredValidationPipe } from '@src/api/pipes/configured-validation-pipe';
import { UpdateDocumentUsecase } from '@src/core/services/document/usecases/update-document.usecase copy';

@WebSocketGateway(8080, { path: '/documents' })
@UsePipes(ConfiguredValidationPipe.new())
@UseFilters(new WsExceptionsFilter())
class DocumentsGateway {
  constructor(private readonly updateDocumentUsecase: UpdateDocumentUsecase) {}

  @SubscribeMessage(START_EDITING_DOCUMENT_CLIENT_EMIT_EVENT)
  async startEditing(
    @MessageBody() payload: StartEditingDocumentClientEmitPayload,
    @ConnectedSocket() client: WebSocket,
  ): Promise<void> {
    console.log('payload', payload);
  }

  @SubscribeMessage(UPDATE_DOCUMENT_CLIENT_EMIT_EVENT)
  async updateDocument(@MessageBody() payload: UpdateDocumentClientEmitPayload): Promise<void> {
    await this.updateDocumentUsecase.execute(payload);
  }
}

export { DocumentsGateway };
