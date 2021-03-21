import { UserDto } from '@shared/dto';
import { IUserModel } from '@src/data/dao/user/user.model';

export const mapUserEntityToUserDto = (userModel: IUserModel): UserDto => new UserDto(userModel);
