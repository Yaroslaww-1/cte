import { Injectable } from '@nestjs/common';
import { DocumentDto } from '@shared/dto';
import { mapDocumentModelToUserDto } from './document.mappings';
import { DocumentDao } from '@src/data/dao/document/document.dao';

@Injectable()
export class DocumentService {
  constructor(private readonly documentDao: DocumentDao) {}

  async getDocuments(): Promise<DocumentDto[]> {
    const documents = await this.documentDao.findAll();
    return documents.map(mapDocumentModelToUserDto);
  }
}
