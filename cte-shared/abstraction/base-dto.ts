import { validateOrReject } from 'class-validator';

import { WithoutFunctions } from '../types';

class BaseDto<P> {
  constructor(props: P) {
    Object.assign(this, props);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  static async new<T extends object>(type: new (props: T) => T, props: WithoutFunctions<T>): Promise<T> {
    const obj = new type(props as T);
    await validateOrReject(obj);
    return obj;
  }
}

export { BaseDto };
