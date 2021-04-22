import { IUserModel, UserModel } from '../user/user.model';
import { Model, RelationMappings } from 'objection';

interface IRefreshSessionModel {
  id: string;
  refreshTokenId: string;
  userAgent?: string;
  fingerprint: string;
  ip: string;
  expiresInMs: number;

  userId: string;
  user: IUserModel;
}

interface RefreshSessionModel extends IRefreshSessionModel {}
class RefreshSessionModel extends Model {
  static get tableName(): string {
    return 'refresh_sessions';
  }

  static get jsonSchema(): Record<string, unknown> {
    return {
      type: 'object',
      properties: {
        id: { type: 'string' },
        refreshTokenId: { type: 'string' },
        userAgent: { type: 'string' },
        fingerprint: { type: 'string' },
        ip: { type: 'string' },
        expiresInMs: { type: 'bigint' },
        userId: { type: 'string' },
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
          from: 'refresh_sessions.userId',
          to: 'users.id',
        },
      },
    };
  }
}

export { RefreshSessionModel, IRefreshSessionModel };
