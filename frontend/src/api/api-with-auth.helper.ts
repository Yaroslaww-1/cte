// import { Api } from './api.helper';
// import bearerTokenService from './services/auth/bearer-token.service';

// const BASE_URL = process.env.REACT_APP_API_URL || '/api';

// class ApiWithAuth extends Api {
//   constructor() {
//     super();

//     super.instance.interceptors.request.use(request => {
//       request.headers.authorization = bearerTokenService.getBearer();
//       // if access token expired and refreshToken is exist >> go to API and get new access token
//       if (AuthService.isAccessTokenExpired() && AuthService.hasRefreshToken()) {
//         return AuthService.debounceRefreshTokens()
//           .then(response => {
//             AuthService.setBearer(response.data.accessToken)
//             request.headers.authorization = AuthService.getBearer()
//             return request
//           }).catch(error => Promise.reject(error))
//       } else {
//         return request
//       }
//     }, error => {
//       return Promise.reject(error)
//     })
//   }

//   }
// }

// export default new ApiWithAuth();
