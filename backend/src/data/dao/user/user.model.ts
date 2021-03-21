import { Model, RelationMappings } from 'objection';
import { DocumentModel } from '../document/document.model';

interface IUserModel {
	id: number;
	name: string;
	email: string;
	passwordHash: string;
}

interface UserModel extends IUserModel {}
class UserModel extends Model {
	static get tableName(): string {
		return 'users';
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
