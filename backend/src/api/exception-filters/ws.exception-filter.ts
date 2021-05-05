import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import * as WebSocket from 'ws';
import { serialize } from 'class-transformer';

import { ErrorServerEmit } from '@shared/ws/emits-payload';
import { getErrorMessage } from './helpers/get-error-message.helper';

@Catch()
export class WsExceptionsFilter extends BaseWsExceptionFilter {
  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const args = host.getArgs();
    const clientSocket = args.find(arg => arg instanceof WebSocket);

    console.error(`Exception: exception=${exception}`);

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
