/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default {
  setUser(state: any, payload: any): any {
    state.userName = payload.userName;
  },
};
