/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { registerUser } from '../../../requests.ts';

export default {
  async signUp(context: any, payload: any): Promise<any> {
    const response = await registerUser(payload);

    if (!response) {
      throw new Error('Failed to authenticate');
    } else {
      context.commit('setUser', {
        userName: response.data.userName,
      });
    }
  },
};
