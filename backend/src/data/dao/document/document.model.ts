import { IUserModel, UserModel } from '../user/user.model';
import { Model, RelationMappings } from 'objection';

interface IDocumentModel {
	id: number;
	title: string;
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
					from: 'documents.user_id',
					to: 'users.id',
				},
			},
		};
	}
}

export { DocumentModel, IDocumentModel };
