import { UserDto } from '@shared/dto';
import { ConfirmEmailRequest, ConfirmEmailSuccessResponse, CreateUserRequest } from '@shared/request-response';
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

  static async createUser(request: CreateUserRequest): Promise<UserDto> {
    return await api.post(endpoint, request);
  }

  static async confirmEmail(request: ConfirmEmailRequest): Promise<ConfirmEmailSuccessResponse> {
    return await api.post(`${endpoint}/confirm-email`, request);
  }
}

export { UserApi };
