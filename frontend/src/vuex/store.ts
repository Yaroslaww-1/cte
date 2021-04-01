import { createStore } from 'vuex';

import authModule from '@src/pages/auth/vuex';

const store = createStore({
  modules: {
    auth: authModule,
  },
});

export default store;
