import {
  LoginRequest,
  LoginSuccessResponse,
  LogoutSuccessResponse,
  RefreshTokensRequest,
  RefreshTokensSuccessResponse,
} from '@shared/request-response';
import { api, apiWithAuth } from '../../api.helper';

const endpoint = 'auth';

class AuthApi {
  static async login(request: LoginRequest): Promise<LoginSuccessResponse> {
    return await api.post(`${endpoint}/login`, request);
  }

  static async loginWithGoogle(code: string): Promise<LoginSuccessResponse> {
    return await api.get(`google-auth/callback?code=${code}`);
  }

  static async logout(): Promise<LogoutSuccessResponse> {
    return await apiWithAuth.post(`${endpoint}/logout`, {});
  }

  static async refreshTokens(request: RefreshTokensRequest): Promise<RefreshTokensSuccessResponse> {
    return await api.post(`${endpoint}/refresh-tokens`, request);
  }
}

export { AuthApi };
