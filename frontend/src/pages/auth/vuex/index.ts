import mutations from './mutations.js';
import getters from './getters.js';
import actions from './actions.js';

export default {
  state(): unknown {
    return {
      userName: null,
    };
  },
  mutations,
  actions,
  getters,
};
