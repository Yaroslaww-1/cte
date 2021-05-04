/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpException } from '@nestjs/common';

import { ValidationException } from '@src/core/exceptions/validation.exception';

const getErrorMessage = (exception: HttpException): string => {
  // let message: string = ;

  if (exception instanceof ValidationException) {
    return exception.message;
  }

  return exception.message;

  // if (exception.getResponse && exception.getResponse() !== '') {
  //   let response = exception.getResponse();
  // }

  // if (exception.getResponse && exception.getResponse() !== '') {
  //   let errorMessage: any = exception.getResponse();

  //   console.log(errorMessage);

  //   // if (typeof errorMessage === 'object') {
  //   //   errorMessage = errorMessage.message ?? 'Unhandled error occurred!';
  //   // }

  //   if (typeof errorMessage !== 'string') {
  //     errorMessage = JSON.stringify(errorMessage);
  //   }

  //   message = errorMessage;
  // }

  // return message;
};

export { getErrorMessage };
