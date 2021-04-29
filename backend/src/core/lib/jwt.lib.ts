import { verify, sign, SignOptions } from 'jsonwebtoken';
import { TokenExpiredException } from '../exceptions/jwt-token/token-expired.exception';
import { TokenNotSignedException } from '../exceptions/jwt-token/token-not-signed.exception copy';
import { TokenNotVerifiedException } from '../exceptions/jwt-token/token-not-verified.exception';

const jwtVerify = (SECRET: string) => <T>(token: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    verify(token, SECRET, (error, decoded) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          return reject(new TokenExpiredException());
        }
        return reject(new TokenNotVerifiedException(error.message));
      }
      return resolve((decoded as unknown) as T);
    });
  });
};

type JwtPayloadType = string | Record<string, unknown> | Buffer;
type JwtSignOptions = Omit<SignOptions, 'algorithm'> & { algorithm: string };

const jwtSign = (SECRET: string) => (payload: JwtPayloadType, options: JwtSignOptions): Promise<string> => {
  return new Promise((resolve, reject) => {
    sign(payload, SECRET, options as SignOptions, (error, token) => {
      if (error) {
        return reject(new TokenNotSignedException(error.message));
      } else {
        return resolve(token as string);
      }
    });
  });
};

export { jwtVerify, jwtSign, JwtPayloadType, JwtSignOptions };
