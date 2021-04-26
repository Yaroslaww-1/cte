/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { AuthService } from '@api/auth.service';
import axios from 'axios';

export default {
  async signUp(context: any, payload: any): Promise<any> {
    const response = await AuthService.login(payload);

    if (!response) {
      throw new Error('Failed to authenticate');
    } else {
      context.commit('setUser', { 
        userName: 'response.data.userName',
        token: 'response.data.token',
      });
    }
  },
  async logIn(context: any, payload: any): Promise<any> {
    await axios.get('', payload)
    .then(response => {
      if (!response) {
        const error = new Error('Failed to authenticate. Check your login data.');
        throw error;
      }
      context.commit('setUser', {
        token: response.data.idToken,
        userId: response.data.userId,
      });
    });
  },
  logOut(context: any) {
    context.commit('setUser', {
      userId: null,
      token: null,
    });
  }
};
