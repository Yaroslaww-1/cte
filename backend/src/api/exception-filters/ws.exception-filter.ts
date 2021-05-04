/* eslint-disable @typescript-eslint/ban-types */
import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import * as WebSocket from 'ws';
import { serialize } from 'class-transformer';

import { ErrorServerEmit } from '@shared/ws/emits';
import { getErrorMessage } from './helpers/get-error-message.helper';

@Catch()
export class WithErrorEmitExceptionsFilter extends BaseWsExceptionFilter {
  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const args = host.getArgs();
    const clientSocket = args.find(arg => arg instanceof WebSocket);

    if (clientSocket instanceof WebSocket) {
      let message = 'Unhandled error occurred!';

      if (exception instanceof HttpException) {
        message = getErrorMessage(exception);
      }

      const errorEmit = await ErrorServerEmit.new(ErrorServerEmit, { message });
      const errorJson = serialize(errorEmit);
      clientSocket.send(errorJson);
    }
    super.catch(exception, host);
  }
}
