/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpException } from '@nestjs/common';

import { ValidationException } from '@src/core/exceptions/validation.exception';

const getErrorMessage = (exception: HttpException): string => {
  if (exception instanceof ValidationException) {
    return exception.message;
  }

  return exception.message;
};

export { getErrorMessage };
