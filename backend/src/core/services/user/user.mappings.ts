import { UserDto } from '@shared/dto';
import { UserEntity } from '@data/user/user.entity';

export const mapUserEntityToUserDto = (userEntity: UserEntity): UserDto => {
	return new UserDto(userEntity);
};
