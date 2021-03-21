import { Inject, Injectable } from '@nestjs/common';
import { DocumentModel } from './document.model';
import { ModelClass } from 'objection';

@Injectable()
export class DocumentDao {
	constructor(@Inject(DocumentModel) private readonly documentModel: ModelClass<DocumentModel>) {}

	async findAll(): Promise<DocumentModel[]> {
		return await this.documentModel.query().withGraphFetched({ user: true });
	}
}
