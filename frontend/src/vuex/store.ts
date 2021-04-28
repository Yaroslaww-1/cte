import { createStore } from 'vuex';

import authModule from '@src/pages/auth/vuex';
import documentsModule from '@src/pages/documents/vuex';

const store = createStore({
  modules: {
    auth: authModule,
    documents: documentsModule,
  },
});

export default store;
