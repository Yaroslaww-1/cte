import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

import { DocumentDto } from '@shared/dto';
import { DocumentApi } from '@src/api/services/document/document.api';
import getDateAndTime from '@src/shared-frontend/helpers/date-time/dateAndTime';

@Module({ namespaced: true, name: 'documentEdit' })
class DocumentEditVuexModule extends VuexModule {
  document: DocumentDto | null = null;

  dialogOpened: { [prop: string]: boolean } = { create: false, delete: false, contributor: false };

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

  @Mutation
  toggleTheDialog(key: string): void {
    this.dialogOpened[key] = !this.dialogOpened[key];
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
    this.changeModifiedDate();
  }

  @Action
  changeModifiedDate(): void {
    const dateAndTime = getDateAndTime();
    this.editModifiedDate(dateAndTime);
  }

  @Action
  toggleDialog(tuple: [string, DocumentDto | null]): void {
    this.toggleTheDialog(tuple[0]);
    if (tuple[1]) this.updateDocument(tuple[1]);
  }
}

export { DocumentEditVuexModule };
