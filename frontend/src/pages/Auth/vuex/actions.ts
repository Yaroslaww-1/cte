/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { AuthService } from '@api/auth.service';

export default {
  async signUp(context: any, payload: any): Promise<any> {
    const response = await AuthService.login(payload);

    if (!response) {
      throw new Error('Failed to authenticate');
    } else {
      context.commit('setUser', {
        userName: 'response.data.userName',
      });
    }
  },
};
