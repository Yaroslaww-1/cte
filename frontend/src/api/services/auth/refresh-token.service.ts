class RefreshTokenService {
  isRefreshTokenExist(): boolean {
    // TODO: refactor
    return localStorage.getItem('isRefreshTokenExist') === 'true';
  }

  updateIsRefreshTokenExist(isRefreshTokenExist: boolean): void {
    localStorage.setItem('isRefreshTokenExist', `${isRefreshTokenExist}`);
  }
}

const refreshTokenService = new RefreshTokenService();

export { refreshTokenService };
