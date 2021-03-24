import { IUserModel, UserModel } from '../user/user.model';
import { Model, RelationMappings } from 'objection';

interface IRefreshSessionModel {
  id: number;
  refreshToken: string;
  userAgent?: string;
  fingerprint: string;
  ip: string;
  expiresIn: number;

  userId: number;
  user: IUserModel;
}

interface RefreshSessionModel extends IRefreshSessionModel {}
class RefreshSessionModel extends Model {
  static get tableName(): string {
    return 'refresh_sessions';
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
