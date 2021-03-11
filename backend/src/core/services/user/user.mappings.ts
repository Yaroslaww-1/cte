import { UserDto } from '@shared/dto';
import { IUserModel } from '@src/data/user/user.interface';

export const mapUserEntityToUserDto = (userModel: IUserModel) => new UserDto(userModel);