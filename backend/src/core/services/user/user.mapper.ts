import { IBaseMapper } from '@src/core/abstraction/base-mapper.interface';
import { UserDto } from '@shared/dto';
import { IUserModel } from '@src/data/dao/user/user.model';
import { UserEntity } from './entities/user.entity';

class UserMapper implements IBaseMapper<IUserModel, UserEntity, UserDto> {
  async mapToEntity(model: IUserModel): Promise<UserEntity> {
    return UserEntity.new(UserEntity, model);
  }

  async mapToEntityMultiple(models: IUserModel[]): Promise<UserEntity[]> {
    return Promise.all(models.map(model => UserEntity.new(UserEntity, model)));
  }

  async mapToDto(entity: UserEntity): Promise<UserDto> {
    return UserDto.new(UserDto, entity);
  }

  async mapToDtoMultiple(entities: UserEntity[]): Promise<UserDto[]> {
    return Promise.all(entities.map(entity => UserDto.new(UserDto, entity)));
  }
}

export { UserMapper };
