import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { UseFilters, UsePipes } from '@nestjs/common';
import * as WebSocket from 'ws';

import {
  StartEditingDocumentClientEmitPayload,
  START_EDITING_DOCUMENT_CLIENT_EMIT_EVENT,
  UpdateDocumentClientServerEmitPayload,
  UPDATE_DOCUMENT_CLIENT_SERVER_EMIT_EVENT,
} from '@shared/ws/emits-payload';
import { WsExceptionsFilter } from '@src/api/exception-filters/ws.exception-filter';
import { ConfiguredValidationPipe } from '@src/api/pipes/configured-validation-pipe';
import { UpdateDocumentUsecase } from '@src/core/services/document/usecases/update-document.usecase';
import { StartEditingDocumentUsecase } from '@src/core/services/document/usecases/start-editing-document.usecase';
import { StartEditingDocumentDto } from '@src/core/services/document/dto/start-editing-document.dto';

@WebSocketGateway({ path: '/documents' })
@UsePipes(ConfiguredValidationPipe.new())
@UseFilters(new WsExceptionsFilter())
class DocumentsGateway {
  constructor(
    private readonly startEditingDocumentUsecase: StartEditingDocumentUsecase,
    private readonly updateDocumentUsecase: UpdateDocumentUsecase,
  ) {}

  @SubscribeMessage(START_EDITING_DOCUMENT_CLIENT_EMIT_EVENT)
  async startEditing(
    @MessageBody() payload: StartEditingDocumentClientEmitPayload,
    @ConnectedSocket() websocket: WebSocket,
  ): Promise<void> {
    const startEditingDocumentDto = await StartEditingDocumentDto.new(StartEditingDocumentDto, {
      ...payload,
      websocket,
    });
    await this.startEditingDocumentUsecase.execute(startEditingDocumentDto);
  }

  @SubscribeMessage(UPDATE_DOCUMENT_CLIENT_SERVER_EMIT_EVENT)
  async updateDocument(@MessageBody() payload: UpdateDocumentClientServerEmitPayload): Promise<void> {
    await this.updateDocumentUsecase.execute(payload);
  }
}

export { DocumentsGateway };
