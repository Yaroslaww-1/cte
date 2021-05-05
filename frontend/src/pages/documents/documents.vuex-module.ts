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

  @Action({ rawError: true })
  async fetchDocuments(): Promise<void> {
    const documents = await DocumentApi.getAllDocuments();
    this.updateDocuments(documents);
  }

  @Action({ rawError: true })
  async createDocument(createDocumentRequest: CreateDocumentRequest): Promise<DocumentDto> {
    return await DocumentApi.createDocument(createDocumentRequest);
  }
}

export { DocumentsVuexModule };
