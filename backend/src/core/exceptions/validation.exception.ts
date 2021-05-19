import { HttpException, HttpStatus, ValidationError } from '@nestjs/common';

class ValidationException extends HttpException {
  message: string;

  constructor(validationErrors: ValidationError[]) {
    super(validationErrors, HttpStatus.BAD_REQUEST);

    const errorMessages = validationErrors
      .map(error => error.constraints)
      .map(constraints => (constraints ? Object.values(constraints)[0] : 'Unhandled validation error'));

    this.message = errorMessages[0];
  }
}

export { ValidationException };
