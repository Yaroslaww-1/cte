import { IUserModel, UserModel } from '../user/user.model';
import { Model, RelationMappings } from 'objection';

interface IDocumentModel {
  id: string;
  title: string;
  content: string;

  userId: string;
  user: IUserModel;

  createdDate: string;
  modifiedDate: string;
}

interface DocumentModel extends IDocumentModel {}
class DocumentModel extends Model {
  static get tableName(): string {
    return 'documents';
  }

  static get jsonSchema(): Record<string, unknown> {
    return {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        content: { type: 'string' },
        userId: { type: 'string' },
        createdDate: { type: 'string' },
        modifiedDate: { type: 'string' },
      },
    };
  }

  static get pickJsonSchemaProperties(): boolean {
    return true;
  }

  static get relationMappings(): RelationMappings {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'documents.userId',
          to: 'users.id',
        },
      },
    };
  }
}

export { DocumentModel, IDocumentModel };
