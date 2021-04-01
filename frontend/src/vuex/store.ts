import { createStore } from 'vuex';

import authModule from '@src/pages/Auth/vuex';

const store = createStore({
  modules: {
    auth: authModule,
  },
});

export default store;
