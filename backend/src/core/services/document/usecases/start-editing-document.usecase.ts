import { Injectable } from '@nestjs/common';

import { IBaseUsecase } from '@src/core/abstraction/base-usecase.interface';
import { WsRoomsService } from '../services/ws-rooms.service';
import { StartEditingDocumentDto } from '../dto/start-editing-document.dto';
import { WebSocket } from '@src/core/lib/ws.lib';

@Injectable()
export class StartEditingDocumentUsecase implements IBaseUsecase<StartEditingDocumentDto, void> {
  constructor(private readonly wsRoomsService: WsRoomsService) {}

  async execute(startEditingDocumentRequest: StartEditingDocumentDto): Promise<void> {
    const { userId, documentId, websocket } = startEditingDocumentRequest;
    this.wsRoomsService.joinOrCreateRoom({
      user: { id: userId, socket: new WebSocket(websocket) },
      roomId: documentId,
    });
  }
}
