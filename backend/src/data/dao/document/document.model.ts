import { IUserModel, UserModel } from '../user/user.model';
import { Model, RelationMappings } from 'objection';

interface IDocumentModel {
  id: string;
  title: string;
  userId: string;
  user: IUserModel;
}

interface DocumentModel extends IDocumentModel {}
class DocumentModel extends Model {
  static get tableName(): string {
    return 'documents';
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
