import mutations from './mutations';
import getters from './getters';
import actions from './actions';

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
