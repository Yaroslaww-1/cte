import { IBaseMapper } from '@src/core/abstraction/base-mapper.interface';
import { DocumentDto } from '@shared/dto';
import { IDocumentModel } from '@src/data/dao/document/document.model';
import { DocumentEntity } from './entities/document.entity';

class DocumentMapper implements IBaseMapper<IDocumentModel, DocumentEntity, DocumentDto> {
  async mapToEntity(model: IDocumentModel): Promise<DocumentEntity> {
    return DocumentEntity.new(DocumentEntity, model);
  }

  async mapToEntityMultiple(models: IDocumentModel[]): Promise<DocumentEntity[]> {
    return Promise.all(models.map(model => DocumentEntity.new(DocumentEntity, model)));
  }

  async mapToDto(entity: DocumentEntity): Promise<DocumentDto> {
    return DocumentDto.new(DocumentDto, entity);
  }

  async mapToDtoMultiple(entities: DocumentEntity[]): Promise<DocumentDto[]> {
    return Promise.all(entities.map(entity => DocumentDto.new(DocumentDto, entity)));
  }
}

export { DocumentMapper };
