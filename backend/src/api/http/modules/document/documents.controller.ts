import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { DocumentDto } from '@shared/dto';
import { CreateDocumentRequest } from '@shared/request-response';
import { AuthGuard } from '@src/api/guards/auth.guard';
import { CreateDocumentUsecase } from '@src/core/services/document/usecases/create-document.usecase';
import { GetDocumentsUsecase } from '@src/core/services/document/usecases/get-documents.usecase';

@Controller('documents')
@UseGuards(AuthGuard)
export class DocumentController {
  constructor(
    private readonly getDocumentsUsecase: GetDocumentsUsecase,
    private readonly createDocumentUsecase: CreateDocumentUsecase,
  ) {}

  @Get()
  async getDocuments(): Promise<DocumentDto[]> {
    return await this.getDocumentsUsecase.execute();
  }

  @Post()
  @UseGuards(AuthGuard)
  async createNewUser(@Body() request: CreateDocumentRequest): Promise<DocumentDto> {
    return await this.createDocumentUsecase.execute(request);
  }
}
