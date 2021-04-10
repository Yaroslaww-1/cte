import { CreateUserDto, UserDto } from '@shared/dto';
import { api } from '../../api.helper';

const endpoint = 'users';

class UserApi {
  static async getCurrentUser(): Promise<UserDto> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // TODO: REPLACE WITH ACTUAL API CALL!
        resolve({} as UserDto);
      }, 1000);
    });
  }

  // `${API_URL}/auth/refresh-tokens`
  static async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    return await api.post(endpoint, createUserDto);
  }
}

export { UserApi };
