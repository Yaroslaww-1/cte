import mutations from './mutations';
import getters from './getters';
import actions from './actions';

interface Document {
  id: string;
  title: string;
  contributors: string[],
  createdDate: string,
  modifiedDate: string,
}

export default {
  namespaced: true,
  state(): { documents: Array<Document> } {
    return {
      documents: [],
    };
  },
  mutations,
  getters,
  actions,
};