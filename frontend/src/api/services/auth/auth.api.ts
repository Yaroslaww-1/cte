import { LoginDto, LoginSuccessDto, RefreshTokensDto, RefreshTokensSuccessDto, UserDto } from '@shared/dto';
import { api } from '../../api.helper';

const endpoint = 'auth';

class AuthApi {
  static async login(loginDto: LoginDto): Promise<LoginSuccessDto> {
    return await api.post(`${endpoint}/login`, loginDto);
  }

  // `${API_URL}/auth/refresh-tokens`
  static async refreshTokens(refreshTokensDto: RefreshTokensDto): Promise<RefreshTokensSuccessDto> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // TODO: REPLACE WITH ACTUAL API CALL!
        resolve({} as RefreshTokensSuccessDto);
      }, 1000);
    });
  }
}

export { AuthApi };
