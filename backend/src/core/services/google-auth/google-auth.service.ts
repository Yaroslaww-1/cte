import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleAuthService {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  googleLogin(req: any): unknown {
    if (!req.user) return 'No user from google';
    return req.user;
  }
}
