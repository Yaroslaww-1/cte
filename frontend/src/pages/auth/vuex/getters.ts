/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export default {
  userId(state: { [prop: string]: unknown }): any {
    return state.userName;
  },
  token(state: { [prop: string]: unknown }): any {
    return state.token;
  },
  isAuthenticated(state: { [prop: string]: unknown }): boolean {
    return !!state.token;
  }
};
