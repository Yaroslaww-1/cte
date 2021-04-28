/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

type Document = { [prop: string]: string | string[] };

type Tuple = [number, string];

export default {
  createDocument(context: any, payload: Document): void {
    context.commit('createDocument', payload);
  },
  deleteDocument(context: any, index: number): void {
    context.commit('deleteDocument', index);
  },
  addContributor(context: any, tuple: Tuple): void {
    context.commit('addContributor', tuple);
  },
  changeModifiedDate(context: any, tuple: Tuple): void {
    context.commit('changeModifiedDate', tuple);
  },
};