import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidParamsException extends HttpException {
  constructor(message = 'Invalid params') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
