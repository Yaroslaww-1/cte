/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

type Document = { [prop: string]: string | string[] };

type State = { documents: Array<Document> };

export default {
  documents(state: State): Array<Document> {
    return state.documents;
  },
  hasDocuments(state: State): boolean {
    return !!state.documents.length;
  }
};
