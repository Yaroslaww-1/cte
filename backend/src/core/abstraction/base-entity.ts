import { validateOrReject } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

import { PartialBy, WithoutFunctions } from '@shared/types';

class BaseEntity<P> {
  constructor(props: P) {
    Object.assign(this, props);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async new<T extends Record<string, any>>(
    type: new (props: T) => T,
    props: WithoutFunctions<PartialBy<T, 'id'>>,
  ): Promise<T> {
    const propsWithId = {
      id: uuidv4(),
      ...props,
    };
    const obj = new type((propsWithId as unknown) as T);
    await validateOrReject(obj);
    return obj;
  }
}

export { BaseEntity };
