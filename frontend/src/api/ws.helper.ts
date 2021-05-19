/* eslint-disable @typescript-eslint/no-non-null-assertion */
const API_WS_URL = process.env.VUE_APP_API_WS_URL;

type ListenerWithPayload<P> = (payload: P) => void;
type ListenerWithUnknownPayload = ListenerWithPayload<unknown>;

class Ws {
  private readonly ws: WebSocket;
  private readonly listeners: Map<string, Map<string, ListenerWithUnknownPayload>>;

  constructor(route: string) {
    if (!API_WS_URL) {
      console.error('API_WS_URL is not provided! Check your .env file');
    }
    this.ws = new WebSocket(`${API_WS_URL!}/${route}`);
    this.initializeWs();

    this.listeners = new Map();
    this.initializeListeners();
  }

  private initializeWs(): void {
    this.ws.onerror = (error): void => {
      console.error(`Ws error: ${JSON.stringify(error)}`);
    };
  }

  private initializeListeners(): void {
    this.ws.onmessage = ({ data }): void => {
      console.log(`Ws receive message: ${data}`);
      const message = JSON.parse(data);
      const { event, data: payload } = message;
      const listeners = this.listeners.get(event) ?? [];
      for (const listener of listeners.values()) {
        listener(payload);
      }
    };
  }

  send(event: string, payload: unknown): void {
    const message = JSON.stringify({ event, data: payload });
    console.log(`Ws send message: ${message}`);
    this.ws.send(message);
  }

  registerListener<P>(event: string, listener: ListenerWithPayload<P>, identifier: string): void {
    if (this.listeners.has(event)) {
      this.listeners.get(event)?.set(identifier, listener as ListenerWithUnknownPayload);
    } else {
      const listenerMap = new Map();
      listenerMap.set(identifier, listener);
      this.listeners.set(event, listenerMap);
    }
  }
}

export { Ws };
