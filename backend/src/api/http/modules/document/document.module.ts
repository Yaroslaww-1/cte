import { Module } from '@nestjs/common';
import { DocumentController } from './documents.controller';
import { DocumentDao } from '@src/data/dao/document/document.dao';
import { DocumentService } from '@core/services/document/document.service';

const daos = [DocumentDao];
const services = [DocumentService];

@Module({
	controllers: [DocumentController],
	providers: [...daos, ...services],
})
export class DocumentModule {}
