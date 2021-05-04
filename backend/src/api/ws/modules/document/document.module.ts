import { Module } from '@nestjs/common';
import { DocumentsGateway } from './document.gateway';

@Module({
  providers: [DocumentsGateway],
})
export class DocumentModule {}
