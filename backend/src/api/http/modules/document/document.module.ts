import { Module } from '@nestjs/common';

import { DocumentController } from './documents.controller';
import { DocumentDao } from '@src/data/dao/document/document.dao';
import { SharedServicesModule } from '@src/api/shared-services.module';
import { GetDocumentsUsecase } from '@src/core/services/document/usecases/get-documents.usecase';
import { DocumentMapper } from '@src/core/services/document/document.mapper';
import { CreateDocumentUsecase } from '@src/core/services/document/usecases/create-document.usecase';
import { UserModule } from '../user/user.module';
import { GetDocumentUsecase } from '@src/core/services/document/usecases/get-document.usecase';

const daos = [DocumentDao];
const mappers = [DocumentMapper];
const usecases = [GetDocumentsUsecase, CreateDocumentUsecase, GetDocumentUsecase];

@Module({
  imports: [SharedServicesModule, UserModule],
  controllers: [DocumentController],
  providers: [...mappers, ...daos, ...usecases],
  exports: [...mappers, ...daos, ...usecases],
})
export class DocumentModule {}
