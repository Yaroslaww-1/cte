import { validateOrReject } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

import { PartialBy, WithoutFunctions } from '@shared/types';

class BaseEntity {
  constructor(props: unknown) {
    Object.assign(this, props);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async new<Constructor extends Record<string, any>, Entity extends BaseEntity & { id: string }>(
    type: new (props: Constructor) => Entity,
    props: WithoutFunctions<PartialBy<Entity, 'id'>>,
  ): Promise<Entity> {
    const propsWithId = {
      id: uuidv4(),
      ...props,
    };
    const obj = new type((propsWithId as unknown) as Constructor);
    await validateOrReject(obj);
    return obj;
  }

  static async validate(): Promise<void> {
    await validateOrReject(this);
  }
}

export { BaseEntity };
