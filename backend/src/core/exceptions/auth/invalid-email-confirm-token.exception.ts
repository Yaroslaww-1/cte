import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidEmailConfirmTokenException extends HttpException {
  constructor() {
    super('Invalid email confirm token', HttpStatus.UNAUTHORIZED);
  }
}
