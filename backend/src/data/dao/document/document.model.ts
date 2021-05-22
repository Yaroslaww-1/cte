import { IUserModel, UserModel } from '../user/user.model';
import { Model, RelationMappings } from 'objection';
import BaseModel from '../base.model';

interface IDocumentModel {
  id: string;
  title: string;
  content: string;

  userId: string;
  user: IUserModel;

  createdDate: Date;
  modifiedDate: Date;
}

interface DocumentModel extends IDocumentModel {}
class DocumentModel extends BaseModel {
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
        createdDate: { type: 'date' },
        modifiedDate: { type: 'date' },
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

  $beforeInsert(): void {
    this.createdDate = new Date();
    this.modifiedDate = new Date();
  }

  $beforeUpdate(): void {
    this.modifiedDate = new Date();
  }
}

export { DocumentModel, IDocumentModel };
