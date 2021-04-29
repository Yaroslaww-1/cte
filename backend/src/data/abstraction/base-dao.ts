import { ModelClass, Model, PartialModelObject } from 'objection';

import { NullablePartial } from '@shared/types';

class BaseDao<M extends Model> {
  constructor(private readonly model: ModelClass<M>) {}

  getUpdateObjectWithReplacedNulls(updateModel: NullablePartial<Record<string, unknown>>): PartialModelObject<M> {
    const knex = this.model.knex();

    Object.keys(updateModel).forEach(key => {
      if (updateModel[key] === null) {
        updateModel[key] = knex.raw('NULL');
      }
    });

    return updateModel as PartialModelObject<M>;
  }
}

export { BaseDao };
