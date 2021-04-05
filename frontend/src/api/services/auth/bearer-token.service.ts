import store from '../../../vuex/store';

class BearerTokenService {
  private bearerToken = '';

  getBearer(): string {
    return this.bearerToken;
  }

  setBearer(accessToken: string): void {
    this.bearerToken = `Bearer ${accessToken}`;
  }
}

export default new BearerTokenService();
