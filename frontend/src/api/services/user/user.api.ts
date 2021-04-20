import { UserDto } from '@shared/dto';
import { ConfirmEmailRequest, ConfirmEmailSuccessResponse, CreateUserRequest } from '@shared/request-response';
import { api, apiWithAuth } from '../../api.helper';

const endpoint = 'users';

class UserApi {
  static async getCurrentUser(): Promise<UserDto> {
    return await apiWithAuth.get(`${endpoint}/current`);
  }

  static async createUser(request: CreateUserRequest): Promise<UserDto> {
    return await api.post(endpoint, request);
  }

  static async confirmEmail(request: ConfirmEmailRequest): Promise<ConfirmEmailSuccessResponse> {
    return await api.post(`${endpoint}/confirm-email`, request);
  }
}

export { UserApi };
