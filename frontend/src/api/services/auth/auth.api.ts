import { LoginDto, LoginSuccessDto, RefreshTokensDto, RefreshTokensSuccessDto } from '@shared/dto';
import { api } from '../../api.helper';

const endpoint = 'auth';

class AuthApi {
  static async login(loginDto: LoginDto): Promise<LoginSuccessDto> {
    return await api.post(`${endpoint}/login`, loginDto);
  }

  static async refreshTokens(refreshTokensDto: RefreshTokensDto): Promise<RefreshTokensSuccessDto> {
    return await api.post(`${endpoint}/refresh-tokens`, refreshTokensDto);
  }
}

export { AuthApi };
