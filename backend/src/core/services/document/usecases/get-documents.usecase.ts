import { Injectable } from '@nestjs/common';

import { IBaseUsecase } from '@src/core/abstraction/base-usecase.interface';
import { DocumentDto } from '@shared/dto';
import { DocumentMapper } from '../document.mapper';
import { DocumentDao } from '@src/data/dao/document/document.dao';

@Injectable()
class GetDocumentsUsecase implements IBaseUsecase<null, DocumentDto[]> {
  constructor(private readonly documentDao: DocumentDao, private readonly documentMapper: DocumentMapper) {}

  async execute(): Promise<DocumentDto[]> {
    const documents = await this.documentDao.findAll();
    return await this.documentMapper.mapToDtoMultiple(documents);
  }
}

export { GetDocumentsUsecase };
