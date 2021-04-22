import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

import { DocumentDto } from '@shared/dto';
import { DocumentApi } from '@src/api/services/document/document.api';

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
}

export { DocumentsVuexModule };
