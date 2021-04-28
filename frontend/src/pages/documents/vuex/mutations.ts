/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

type Document = { [prop: string]: string | string[] };

type State = { documents: Array<Document> };

type Tuple = [number, string];

export default {
  createDocument(state: State, payload: Document): void {
    state.documents.push(payload);
  },
  deleteDocument(state: State, index: number): void {
    state.documents.splice(index, 1);
  },
  addContributor(state: State, tuple: Tuple): void {
    const document = state.documents[tuple[0]];
    if (document.contributors instanceof Array) {
      document.contributors.push(tuple[1]);
    }
  },
  changeModifiedDate(state: State, tuple: Tuple): void {
    const document = state.documents[tuple[0]];
    document.modifiedDate = tuple[1];
  },
};