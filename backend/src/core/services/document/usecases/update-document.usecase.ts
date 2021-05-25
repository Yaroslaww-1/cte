import { Injectable } from '@nestjs/common';

import { IBaseUsecase } from '@src/core/abstraction/base-usecase.interface';
import { DocumentDao } from '@src/data/dao/document/document.dao';
import { DMP } from '@shared/libs/dmp.lib';
import { WsRoomsService } from '../services/ws-rooms.service';
import {
  UpdateDocumentClientServerEmitPayload,
  UPDATE_DOCUMENT_CLIENT_SERVER_EMIT_EVENT,
} from '@shared/ws/emits-payload';

@Injectable()
export class UpdateDocumentUsecase implements IBaseUsecase<UpdateDocumentClientServerEmitPayload, void> {
  private readonly dmp: DMP;

  constructor(private readonly documentDao: DocumentDao, private readonly wsRoomsService: WsRoomsService) {
    this.dmp = new DMP();
  }

  async execute(updateDocumentRequest: UpdateDocumentClientServerEmitPayload): Promise<void> {
    const document = await this.documentDao.findOne({ id: updateDocumentRequest.documentId });
    if (!document) {
      return;
    }

    this.wsRoomsService.notifyRoom({
      roomId: document.id,
      notificationFunction: user => {
        user.socket.send(UPDATE_DOCUMENT_CLIENT_SERVER_EMIT_EVENT, updateDocumentRequest);
      },
      excludeUserId: updateDocumentRequest.userId,
    });

    const [newDocumentContent] = this.dmp.patchApply(updateDocumentRequest.patchOperations, document.content);

    document.content = newDocumentContent;

    await this.documentDao.updateOne(document.id, document);
  }
}
