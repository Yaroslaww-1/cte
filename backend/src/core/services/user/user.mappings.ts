import { UserDto } from '@shared/dto';
import { IUserModel } from '@src/data/dao/user/user.model';
import { UserEntity } from './entities/user.entity';

const mapUserEntityToUserDto = (userEntity: UserEntity): UserDto => new UserDto(userEntity);

const mapUserModelToUserEntity = (userModel: IUserModel): UserEntity => new UserEntity(userModel);

export { mapUserEntityToUserDto, mapUserModelToUserEntity };
