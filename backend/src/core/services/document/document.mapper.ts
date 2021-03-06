import { IBaseMapper } from '@src/core/abstraction/base-mapper.interface';
import { DocumentDto } from '@shared/dto';
import { IDocumentModel } from '@src/data/dao/document/document.model';
import { DocumentEntity } from './entities/document.entity';
import { UserEntity } from '../user/entities/user.entity';

class DocumentMapper implements IBaseMapper<IDocumentModel, DocumentEntity, DocumentDto> {
  async mapToEntity(model: IDocumentModel): Promise<DocumentEntity> {
    const user = await UserEntity.new(UserEntity, model.user);
    return DocumentEntity.new(DocumentEntity, {
      title: model.title,
      id: model.id,
      createdDate: new Date(model.createdDate),
      modifiedDate: new Date(model.modifiedDate),
      content: model.content,
      user,
    });
  }

  async mapToEntityMultiple(models: IDocumentModel[]): Promise<DocumentEntity[]> {
    return Promise.all(models.map(model => this.mapToEntity(model)));
  }

  async mapToDto(entity: DocumentEntity): Promise<DocumentDto> {
    return DocumentDto.new(DocumentDto, {
      id: entity.id,
      title: entity.title,
      user: entity.user,
      content: entity.content,
      createdDate: entity.createdDate.toISOString(),
      modifiedDate: entity.modifiedDate.toISOString(),
      // TODO: fix contributorsNames
      contributorsNames: [],
    });
  }

  async mapToDtoMultiple(entities: DocumentEntity[]): Promise<DocumentDto[]> {
    return Promise.all(
      entities.map(entity =>
        DocumentDto.new(DocumentDto, {
          id: entity.id,
          title: entity.title,
          user: entity.user,
          content: entity.content,
          createdDate: entity.createdDate.toISOString(),
          modifiedDate: entity.modifiedDate.toISOString(),
          // TODO: fix contributorsNames
          contributorsNames: [],
        }),
      ),
    );
  }
}

export { DocumentMapper };
