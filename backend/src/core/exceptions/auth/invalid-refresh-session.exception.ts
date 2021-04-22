import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidRefreshSessionException extends HttpException {
  constructor() {
    super('Invalid refresh session', HttpStatus.UNAUTHORIZED);
  }
}
