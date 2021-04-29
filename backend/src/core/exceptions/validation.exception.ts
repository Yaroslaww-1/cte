import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';

class ValidationException extends HttpException {
  constructor(validationErrors: ValidationError[]) {
    super(validationErrors, HttpStatus.BAD_REQUEST);
  }
}

export { ValidationException };
