import { Injectable } from '@nestjs/common';

import { IBaseUsecase } from '@src/core/abstraction/base-usecase.interface';
import { DocumentDao } from '@src/data/dao/document/document.dao';
import { UpdateDocumentClientEmitPayload } from '@shared/ws/emits-payload';
import { DMP } from '@shared/libs/dmp.lib';

@Injectable()
export class UpdateDocumentUsecase implements IBaseUsecase<UpdateDocumentClientEmitPayload, void> {
  private readonly dmp: DMP;

  constructor(private readonly documentDao: DocumentDao) {
    this.dmp = new DMP();
  }

  async execute(updateDocumentRequest: UpdateDocumentClientEmitPayload): Promise<void> {
    try {
      const document = await this.documentDao.findOne({ id: updateDocumentRequest.documentId });
      if (!document) {
        return;
      }

      const [newDocumentContent] = this.dmp.patchApply(updateDocumentRequest.patchOperations, document.content);

      document.content = newDocumentContent;

      await this.documentDao.updateOne(document.id, document);
    } catch (e) {
      console.log('EXXX', e);
    }
  }
}
