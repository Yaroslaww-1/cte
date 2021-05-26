import { Model, Pojo } from 'objection';
import { each } from 'lodash';

class BaseModel extends Model {
  ['constructor']: typeof Model;

  $parseDatabaseJson(json: Pojo): Pojo {
    json = super.$parseDatabaseJson(json);
    // eslint-disable-next-line
    each(this.constructor.jsonSchema.properties, (schema: any, prop: string) => {
      if (schema.type === 'date') {
        json[prop] = json[prop] && new Date(json[prop]);
      }
    });
    return json;
  }
}

export default BaseModel;
