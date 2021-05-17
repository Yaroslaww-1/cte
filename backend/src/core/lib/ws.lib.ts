import * as WS from 'ws';

class WebSocket {
  constructor(private readonly ws: WS) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  send<P extends object>(event: string, payload: P): void {
    const message = JSON.stringify({ event, data: payload });
    this.ws.send(message);
  }
}

export { WebSocket };
