import { Controller, Get, UseGuards } from '@nestjs/common';
import { DocumentDto } from '@shared/dto';
import { AuthGuard } from '@src/api/guards/auth.guard';
import { GetDocumentsUsecase } from '@src/core/services/document/usecases/get-documents.usecase';

@Controller('documents')
@UseGuards(AuthGuard)
export class DocumentController {
  constructor(private readonly getDocumentsUsecase: GetDocumentsUsecase) {}

  @Get()
  async getDocuments(): Promise<DocumentDto[]> {
    return await this.getDocumentsUsecase.execute();
  }
}
