import { ValidationError, ValidationPipe } from '@nestjs/common';

import { ValidationException } from '@src/core/exceptions/validation.exception';

class ConfiguredValidationPipe {
  static new(): ValidationPipe {
    return new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (validationErrors: ValidationError[] = []): ValidationException => {
        return new ValidationException(validationErrors);
      },
    });
  }
}

export { ConfiguredValidationPipe };
