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

  @Mutation
  appendContributor(contributorName: string): void {
    this.document?.contributorsNames.push(contributorName);
  }

  @Mutation
  editModifiedDate(date: string): void {
    if (this.document) this.document.modifiedDate = date;
  }

  @Action({ rawError: true })
  async fetchDocument(documentId: string): Promise<void> {
    const document = await DocumentApi.getDocument({ id: documentId });
    this.updateDocument(document);
  }

  @Action
  addContributor(tuple: [DocumentDto, string]): void {
    this.updateDocument(tuple[0]);
    this.appendContributor(tuple[1]);
  }

  @Action
  changeModifiedDate(tuple: [DocumentDto, string]): void {
    this.updateDocument(tuple[0]);
    this.editModifiedDate(tuple[1]);
  }
}

export { DocumentEditVuexModule };
