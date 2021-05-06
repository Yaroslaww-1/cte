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

  @Mutation
  addDocument(document: DocumentDto): void {
    this.documents.push(document);
  }

  @Mutation
  removeDocument(index: number): void {
    this.documents.splice(index, 1);
  }

  @Mutation
  appendContributor(tuple: [number, string]): void {
    const document = this.documents[tuple[0]];
    document.contributors.push(tuple[1]);
  }

  @Mutation
  editModifiedDate(tuple: [number, string]): void {
    const document = this.documents[tuple[0]];
    document.modifiedDate = tuple[1];
  }

  @Action({ rawError: true })
  async fetchDocuments(): Promise<void> {
    const documents = await DocumentApi.getAllDocuments();
    this.updateDocuments(documents);
  }

  @Action
  createDocument(document: DocumentDto): void {
    this.addDocument(document);
  }

  @Action
  deleteDocument(index: number): void {
    this.removeDocument(index);
  }

  @Action
  addContributor(tuple: [number, string]): void {
    this.appendContributor(tuple);
  }

  @Action
  changeModifiedDate(tuple: [number, string]): void {
    this.editModifiedDate(tuple);
  }
}

export { DocumentsVuexModule };
