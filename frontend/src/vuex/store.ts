import { Store } from 'vuex';
// Note: you shouldn't need to import store modules here.
import { initializeStores, modules } from './store-accessor';

// Initialize the modules using a Vuex plugin that runs when the root store is
// first initialized. This is vital to using static modules because the
// modules don't know the root store when they are loaded. Initializing them
// when the root store is created allows them to be hooked up properly.
const initializer = (store: Store<unknown>): void => initializeStores(store);
export const plugins = [initializer];
export * from './store-accessor'; // re-export the modules

// Export the root store. You can add mutations & actions here as well.
// Note that this is a standard Vuex store, not a vuex-module-decorator one.
// (Perhaps could be, but I put everything in modules)
export default new Store({
  plugins, // important!
  modules, // important!
});
