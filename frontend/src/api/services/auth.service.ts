import { LoginDto, LoginSuccessDto } from '@shared/dto/auth';

import api from '../api.helper';

const endpoint = 'auth';

export class AuthService {
  static async login(loginDto: LoginDto): Promise<LoginSuccessDto> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // TODO: REMOVE!
        resolve({} as LoginSuccessDto);
      }, 1000);
    });
  }
}
