import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';

import { DocumentModel } from './document.model';
import { DocumentEntity } from '@src/core/services/document/entities/document.entity';
import { DocumentMapper } from '@src/core/services/document/document.mapper';

@Injectable()
export class DocumentDao {
  constructor(
    @Inject(DocumentModel) private readonly documentModel: ModelClass<DocumentModel>,
    private readonly documentMapper: DocumentMapper,
  ) {}

  async findAll(): Promise<DocumentEntity[]> {
    const documents = await this.documentModel.query().withGraphFetched({ user: true });
    return await this.documentMapper.mapToEntityMultiple(documents);
  }

  async saveOne(createDocument: DocumentEntity): Promise<DocumentEntity> {
    const document = await this.documentModel.query().insert(createDocument).returning('*');
    return await this.documentMapper.mapToEntity(document);
  }
}
