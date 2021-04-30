import mutations from './mutations';
import getters from './getters';
import actions from './actions';

interface State {
  userName: unknown;
  token: unknown;
}

export default {
  namespaced: true,
  state(): State {
    return {
      token: null,
      userName: null,
    };
  },
  mutations,
  actions,
  getters,
};
