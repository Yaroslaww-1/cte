import { Controller, Get, UseGuards } from '@nestjs/common';
import { DocumentDto } from '@shared/dto';
import { AuthGuard } from '@src/api/guards/auth.guard';
import { DocumentService } from '@src/core/services/document/document.service';

@Controller('documents')
@UseGuards(AuthGuard)
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  async getDocuments(): Promise<DocumentDto[]> {
    return await this.documentService.getDocuments();
  }
}
