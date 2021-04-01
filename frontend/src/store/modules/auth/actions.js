import { registerUser } from '../../../requests.ts';

export default {
  async signUp(context, payload) {
    const response = await registerUser(payload); 

    if (!response) {
      const error = new Error('Failed to authenticate');
      throw error;
    }
    else {
      context.commit('setUser', {
        userName: response.data.userName,
    });
    }
  },
};