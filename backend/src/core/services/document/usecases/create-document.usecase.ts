import { Injectable } from '@nestjs/common';

import { IBaseUsecase } from '@src/core/abstraction/base-usecase.interface';
import { DocumentDto } from '@shared/dto';
import { CreateDocumentRequest } from '@shared/request-response';
import { DocumentDao } from '@src/data/dao/document/document.dao';
import { DocumentMapper } from '../document.mapper';
import { DocumentEntity } from '../entities/document.entity';
import { UserDao } from '@src/data/dao/user/user.dao';
import { NotFoundException } from '@src/core/exceptions/not-found.exception';

@Injectable()
export class CreateDocumentUsecase implements IBaseUsecase<CreateDocumentRequest, DocumentDto> {
  constructor(
    private readonly documentDao: DocumentDao,
    private readonly userDao: UserDao,
    private readonly documentMapper: DocumentMapper,
  ) {}

  async execute(createDocumentRequest: CreateDocumentRequest): Promise<DocumentDto> {
    const user = await this.userDao.findOne({ id: createDocumentRequest.userId });
    if (!user) {
      throw new NotFoundException('user');
    }

    const document = await DocumentEntity.newWithDefaults({
      title: createDocumentRequest.title,
      createdDate: new Date(createDocumentRequest.createdDate), 
      modifiedDate: new Date(createDocumentRequest.modifiedDate),
      user,
    });

    await this.documentDao.saveOne(document);

    return await this.documentMapper.mapToDto(document);
  }
}
