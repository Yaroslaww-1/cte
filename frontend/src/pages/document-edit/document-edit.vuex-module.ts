import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

import { DocumentDto } from '@shared/dto';
import { DocumentApi } from '@src/api/services/document/document.api';

@Module({ namespaced: true, name: 'documentEdit' })
class DocumentEditVuexModule extends VuexModule {
  document: DocumentDto | null = null;

  @Mutation
  updateDocument(document: DocumentDto): void {
    this.document = document;
  }

  @Action({ rawError: true })
  async fetchDocument(documentId: string): Promise<void> {
    const document = await DocumentApi.getDocument({ id: documentId });
    this.updateDocument(document);
  }
}

export { DocumentEditVuexModule };
