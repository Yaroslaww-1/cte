import { UserDto } from '@shared/dto';
import { LoginDto, LoginSuccessDto } from '@shared/dto/auth';

import api from '../../api.helper';

const endpoint = 'auth';

export class AuthService {
  static async login(loginDto: LoginDto): Promise<LoginSuccessDto> {
    const response = await api.post(endpoint, loginDto, {});
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // TODO: REPLACE WITH ACTUAL API CALL!
        resolve({} as LoginSuccessDto);
      }, 1000);
    });
  }

  static async getCurrentUser(): Promise<UserDto> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // TODO: REPLACE WITH ACTUAL API CALL!
        resolve({} as UserDto);
      }, 1000);
    });
  }
}
