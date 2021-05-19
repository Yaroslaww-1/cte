// This is the "store accessor":
// It initializes all the modules using a Vuex plugin (see store/index.ts)
// In here you import all your modules, call getModule on them to turn them
// into the actual stores, and then re-export them.

import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';

import { AuthVuexModule } from '@pages/auth/auth.vuex-module';
import { DocumentsVuexModule } from '@pages/documents/documents.vuex-module';
import { DocumentEditVuexModule } from '@pages/document-edit/document-edit.vuex-module';

// Each store is the singleton instance of its module class
// Use these -- they have methods for state/getters/mutations/actions
// (result from getModule(...))
export let authVuexModule: AuthVuexModule;
export let documentsVuexModule: DocumentsVuexModule;
export let documentEditVuexModule: DocumentEditVuexModule;

// initializer plugin: sets up state/getters/mutations/actions for each store
export function initializeStores(store: Store<unknown>): void {
  authVuexModule = getModule(AuthVuexModule, store);
  documentsVuexModule = getModule(DocumentsVuexModule, store);
  documentEditVuexModule = getModule(DocumentEditVuexModule, store);
}

// for use in 'modules' store init (see store/index.ts), so each module
// appears as an element of the root store's state.
// (This is required!)
export const modules = {
  auth: AuthVuexModule,
  documents: DocumentsVuexModule,
  documentEdit: DocumentEditVuexModule,
};
