import { AccessTokenPayloadDto } from '@shared/dto/auth/access-token-payload.dto';
import { debounce } from '@shared/helpers';
import { RefreshTokensSuccessResponse } from '@shared/request-response';
import { authVuexModule } from '@src/vuex/store-accessor';

const parseAccessTokenPayload = (accessToken: string): AccessTokenPayloadDto => {
  let payload = '';
  let tokenData = {};

  try {
    payload = accessToken.split('.')[1];
    tokenData = JSON.parse(atob(payload));
  } catch (error) {
    throw new Error(error);
  }

  return new AccessTokenPayloadDto(tokenData as AccessTokenPayloadDto);
};

const debounceRefreshTokens = debounce<RefreshTokensSuccessResponse | undefined>(() => {
  return authVuexModule.refreshTokens();
}, 100);

export { parseAccessTokenPayload, debounceRefreshTokens };
