import { DocumentDto } from '@shared/dto';
import { IDocumentModel } from '@src/data/dao/document/document.model';

export const mapDocumentModelToUserDto = (documentModel: IDocumentModel): DocumentDto => new DocumentDto(documentModel);
