import * as bcrypt from 'bcryptjs';

const makePasswordHash = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) return reject(error);

      bcrypt.hash(password, salt, (error, hash) => {
        if (error) return reject(error);
        return resolve(hash);
      });
    });
  });
};

export { makePasswordHash };
