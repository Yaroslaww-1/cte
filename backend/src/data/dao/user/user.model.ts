import { Model, RelationMappings } from 'objection';
import { DocumentModel } from '../document/document.model';
import BaseModel from '../base.model';

interface IUserModel {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  confirmEmailToken?: string;
}

interface UserModel extends IUserModel {}
class UserModel extends BaseModel {
  static get tableName(): string {
    return 'users';
  }

  static get jsonSchema(): Record<string, unknown> {
    return {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        passwordHash: { type: ['string', 'null'] },
        confirmEmailToken: { type: ['string', 'null'] },
      },
    };
  }

  static get pickJsonSchemaProperties(): boolean {
    return true;
  }

  static get relationMappings(): RelationMappings {
    return {
      documents: {
        relation: Model.HasManyRelation,
        modelClass: DocumentModel,
        join: {
          from: 'users.id',
          to: 'documents.userId',
        },
      },
    };
  }
}

export { UserModel, IUserModel };
