/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpException } from '@nestjs/common';

const getErrorMessage = (exception: HttpException): string => {
  return exception.message;
};

export { getErrorMessage };
