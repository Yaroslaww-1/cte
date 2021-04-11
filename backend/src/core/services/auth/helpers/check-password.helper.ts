import { InvalidPasswordException } from '@src/core/exceptions/auth/invalid-password.exception';
import * as bcrypt from 'bcryptjs';

const checkPassword = (password: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (error, result) => {
      if (error) return reject(error);
      if (!result) return reject(new InvalidPasswordException());
      return resolve(result);
    });
  });
};

export { checkPassword };
