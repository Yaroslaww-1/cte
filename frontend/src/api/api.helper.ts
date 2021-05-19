/* eslint-disable sonarjs/no-duplicate-string */
import axios, { AxiosInstance, AxiosError } from 'axios';
import { stringifyParams } from '@shared/helpers';
import { ApiResponseException } from '@shared-frontend/exceptions/api-response.exception';
import { authVuexModule } from '@src/vuex/store-accessor';
import { refreshTokenService } from './services/auth/refresh-token.service';
import { debounceRefreshTokens } from '@shared-frontend/helpers/auth.helper';

const API_URL = process.env.VUE_APP_API_URL;

class Api {
  instance: AxiosInstance;
  private readonly commonHeaders: {
    [key in string]: string;
  };

  constructor() {
    if (!API_URL) {
      console.error('API_URL is not provided! Check your .env file');
    }
    this.instance = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.commonHeaders = { 'Content-Type': 'application/json' };
  }

  async get<Response = unknown, Params = unknown>(url: string, params?: Params): Promise<Response> {
    const stringifiedParams = params ? `?${stringifyParams(params)}` : '';
    const response = await this.instance
      .get<Response>(`${url}${stringifiedParams}`, {
        headers: this.commonHeaders,
        data: {},
      })
      .then(({ data }) => data)
      .catch(this.handleError);
    return this.validateAndReturnResponse<Response>(response);
  }

  async post<Response = unknown, Payload = unknown>(url: string, payload: Payload): Promise<Response> {
    const response = await this.instance
      .post(url, payload, {
        headers: this.commonHeaders,
        withCredentials: true,
      })
      .then(({ data }) => data)
      .catch(this.handleError);
    return this.validateAndReturnResponse<Response>(response);
  }

  async put<Response = unknown, Payload = unknown>(url: string, payload: Payload): Promise<Response> {
    const response = await this.instance
      .put(url, payload, {
        headers: this.commonHeaders,
      })
      .then(({ data }) => data)
      .catch(this.handleError);
    return this.validateAndReturnResponse<Response>(response);
  }

  async delete<Response = unknown, Payload = unknown>(url: string, data?: Payload): Promise<Response> {
    const response = await this.instance
      .delete(url, {
        headers: this.commonHeaders,
        data,
      })
      .then(({ data }) => data)
      .catch(this.handleError);
    return this.validateAndReturnResponse<Response>(response);
  }

  private validateAndReturnResponse<Response>(responseData: Response | void): Response {
    if (!responseData) {
      throw new ApiResponseException();
    } else {
      return responseData;
    }
  }

  private handleError(error: AxiosError): void {
    if (error.response) {
      throw new ApiResponseException(error.response.data.error);
    } else if (error.request) {
      throw new ApiResponseException(error.request.responseText);
    } else {
      throw new ApiResponseException(error.message);
    }
  }
}

class ApiWithAuth extends Api {
  constructor() {
    super();

    this.instance = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    this.initInterceptor();
  }

  initInterceptor(): void {
    this.instance.interceptors.request.use(
      request => {
        request.headers.authorization = authVuexModule.bearer;
        // if access token expired and refreshToken is exist >> go to API and get new access token
        if (authVuexModule.isAccessTokenExpired && refreshTokenService.isRefreshTokenExist()) {
          return (
            debounceRefreshTokens()
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .then(response => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                authVuexModule.updateAccessToken(response!.accessToken);
                request.headers.authorization = authVuexModule.bearer;
                return request;
              })
              .catch(error => Promise.reject(error))
          );
        } else {
          return request;
        }
      },
      error => {
        return Promise.reject(error);
      },
    );
  }
}

const api = new Api();
const apiWithAuth = new ApiWithAuth();

export { Api, ApiWithAuth };
export { api, apiWithAuth };
