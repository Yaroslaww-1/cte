import axios, { AxiosInstance, AxiosError } from 'axios';
import { stringifyParams } from '@shared/helpers';
import { ApiResponseException } from '@shared-frontend/exceptions/api-response.exception';

const BASE_URL = process.env.REACT_APP_API_URL || '/api';

class Api {
  readonly instance: AxiosInstance;
  private readonly commonHeaders: {
    [key in string]: string;
  };

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.commonHeaders = { 'Content-Type': 'application/json' };
  }

  async get<Response = unknown, Params = unknown>(url: string, params?: Params): Promise<Response> {
    const response = await this.instance
      .get<Response>(`${url}?${stringifyParams(params)}`, {
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

export { Api };
export default new Api();
