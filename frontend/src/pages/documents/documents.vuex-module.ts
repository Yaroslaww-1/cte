import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

import { DocumentDto } from '@shared/dto';
import { DocumentApi } from '@src/api/services/document/document.api';
import { CreateDocumentRequest } from '@shared/request-response';

@Module({ namespaced: true, name: 'documents' })
class DocumentsVuexModule extends VuexModule {
  documents: DocumentDto[] = [];

  @Mutation
  updateDocuments(documents: DocumentDto[]): void {
    this.documents = documents;
  }

  @Mutation
  appendDocument(document: DocumentDto): void {
    this.documents.unshift(document);
  }

  @Mutation
  removeDocument(index: number): void {
    this.documents.splice(index, 1);
  }

  @Action({ rawError: true })
  async fetchDocuments(): Promise<void> {
    const documents = await DocumentApi.getAllDocuments();
    this.updateDocuments(documents);
  }

  @Action({ rawError: true })
  async createDocument(createDocumentRequest: CreateDocumentRequest): Promise<DocumentDto> {
    return await DocumentApi.createDocument(createDocumentRequest);
  }

  @Action
  addDocument(document: DocumentDto): void {
    this.appendDocument(document);
  }

  @Action
  deleteDocument(index: number): void {
    this.removeDocument(index);
  }
}

export { DocumentsVuexModule };
