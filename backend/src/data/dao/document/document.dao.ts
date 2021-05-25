import { Inject, Injectable } from '@nestjs/common';
import { QueryBuilder, ModelClass } from 'objection';

import { DocumentModel, IDocumentModel } from './document.model';
import { DocumentEntity } from '@src/core/services/document/entities/document.entity';
import { DocumentMapper } from '@src/core/services/document/document.mapper';
import { NullablePartial } from '@shared/types';
import { BaseDao } from '@src/data/abstraction/base-dao';

// TODO: Reverse dependency
export type IDocumentFilter = Partial<IDocumentModel>;

@Injectable()
export class DocumentDao extends BaseDao<DocumentModel> {
  constructor(
    @Inject(DocumentModel) private readonly documentModel: ModelClass<DocumentModel>,
    private readonly documentMapper: DocumentMapper,
  ) {
    super(documentModel);
  }

  private updateWhereWithFilters(
    { id }: IDocumentFilter,
    qb: QueryBuilder<DocumentModel, DocumentModel[]>,
  ): QueryBuilder<DocumentModel, DocumentModel[]> {
    if (id) {
      qb.where('id', id);
    }

    return qb;
  }

  async findOne(filter: IDocumentFilter): Promise<DocumentEntity | null> {
    const document = await this.documentModel
      .query()
      .withGraphFetched({ user: true })
      .where(qb => this.updateWhereWithFilters(filter, qb))
      .first();
    if (!document) {
      return null;
    }
    return await this.documentMapper.mapToEntity(document);
  }

  async findAll(): Promise<DocumentEntity[]> {
    const documents = await this.documentModel.query().withGraphFetched({ user: true });
    return await this.documentMapper.mapToEntityMultiple(documents);
  }

  async saveOne(createDocument: DocumentEntity): Promise<DocumentEntity> {
    const document = await this.documentModel.query().upsertGraph(createDocument, { insertMissing: true, relate: true }).returning('*');
    return await this.documentMapper.mapToEntity(document);
  }

  async updateOne(id: string, updateDocument: NullablePartial<IDocumentModel>): Promise<DocumentEntity | null> {
    const user = await this.documentModel
      .query()
      .withGraphFetched({ user: true })
      .where({ id })
      .update(super.getUpdateObjectWithReplacedNulls(updateDocument))
      .returning('*')
      .first();
    if (!user) {
      return null;
    }
    return await this.documentMapper.mapToEntity(user);
  }
}
