import { Injectable } from '@nestjs/common';

import { IBaseUsecase } from '@src/core/abstraction/base-usecase.interface';
import { DocumentDto } from '@shared/dto';
import { DocumentMapper } from '../document.mapper';
import { DocumentDao } from '@src/data/dao/document/document.dao';
import { NotFoundException } from '@src/core/exceptions/not-found.exception';

@Injectable()
class GetDocumentUsecase implements IBaseUsecase<string, DocumentDto> {
  constructor(private readonly documentDao: DocumentDao, private readonly documentMapper: DocumentMapper) {}

  async execute(id: string): Promise<DocumentDto> {
    const document = await this.documentDao.findOne({ id });
    if (!document) {
      throw new NotFoundException('document');
    }
    return await this.documentMapper.mapToDto(document);
  }
}

export { GetDocumentUsecase };
