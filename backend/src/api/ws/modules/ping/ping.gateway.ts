import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway(8080)
export class PingGateway {
  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('ping')
  async ping(): Promise<string> {
    return 'pong';
  }
}
