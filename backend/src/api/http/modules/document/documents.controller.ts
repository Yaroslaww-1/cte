import { Controller, Get } from '@nestjs/common';
import { DocumentDto } from '@shared/dto';
import { DocumentService } from '@src/core/services/document/document.service';

@Controller('documents')
export class DocumentController {
	constructor(private readonly documentService: DocumentService) {}

	@Get()
	async getDocuments(): Promise<DocumentDto[]> {
		return await this.documentService.getDocuments();
	}
}
