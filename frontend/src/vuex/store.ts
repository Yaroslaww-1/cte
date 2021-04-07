import { createStore } from 'vuex';

import authModule from '@src/pages/auth/auth.vuex-module';

const store = createStore({
  modules: {
    auth: authModule,
  },
});

export default store;
