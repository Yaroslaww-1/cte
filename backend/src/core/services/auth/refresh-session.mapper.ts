import { IBaseMapper } from '@src/core/abstraction/base-mapper.interface';
import { IRefreshSessionModel } from '@src/data/dao/refresh-session/refresh-session.model';
import { RefreshSessionEntity } from './entities/refresh-session.entity';

class RefreshSessionMapper implements IBaseMapper<IRefreshSessionModel, RefreshSessionEntity, null> {
  async mapToEntity(model: IRefreshSessionModel): Promise<RefreshSessionEntity> {
    return RefreshSessionEntity.new(RefreshSessionEntity, model);
  }

  async mapToEntityMultiple(models: IRefreshSessionModel[]): Promise<RefreshSessionEntity[]> {
    return Promise.all(models.map(model => RefreshSessionEntity.new(RefreshSessionEntity, model)));
  }

  async mapToDto(): Promise<null> {
    return null;
  }

  async mapToDtoMultiple(): Promise<null[]> {
    return [];
  }
}

export { RefreshSessionMapper };
