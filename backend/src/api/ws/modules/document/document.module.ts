import { Module } from '@nestjs/common';

import { DocumentsGateway } from './document.gateway';
import { DocumentDao } from '@src/data/dao/document/document.dao';
import { SharedServicesModule } from '@src/api/shared-services.module';
import { DocumentMapper } from '@src/core/services/document/document.mapper';
import { UserModule } from '@api/http/modules/user/user.module';
import { UpdateDocumentUsecase } from '@src/core/services/document/usecases/update-document.usecase';
import { WsRoomsService } from '@src/core/services/document/services/ws-rooms.service';
import { StartEditingDocumentUsecase } from '@src/core/services/document/usecases/start-editing-document.usecase';

const daos = [DocumentDao];
const mappers = [DocumentMapper];
const usecases = [StartEditingDocumentUsecase, UpdateDocumentUsecase];
const services = [WsRoomsService];

@Module({
  imports: [SharedServicesModule, UserModule],
  providers: [...mappers, ...daos, ...usecases, ...services, DocumentsGateway],
  exports: [...mappers, ...daos, ...usecases, ...services],
})
export class DocumentModule {}
