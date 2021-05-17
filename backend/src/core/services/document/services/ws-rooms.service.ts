/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@nestjs/common';
import { WebSocket } from '@src/core/lib/ws.lib';

import { v4 as uuidv4 } from 'uuid';

interface IWebSocketWithId {
  id: string;
  socket: WebSocket;
}

@Injectable()
class WsRoomsService {
  private rooms: Map<string, Map<string, IWebSocketWithId>>;

  constructor() {
    this.rooms = new Map();
  }

  createRoom({ roomId = uuidv4() }: { roomId: string }): string {
    this.rooms.set(roomId, new Map());
    return roomId;
  }

  deleteRoom(roomId: string): void {
    this.rooms.delete(roomId);
  }

  isRoomExists(roomId: string): boolean {
    return this.rooms.has(roomId);
  }

  joinOrCreateRoom({ user, roomId }: { user: IWebSocketWithId; roomId: string }): void {
    if (!this.isRoomExists(roomId)) {
      roomId = this.createRoom({ roomId });
    }
    this.rooms.get(roomId)?.set(user.id, user);
  }

  leaveRoom({ user, roomId }: { user: IWebSocketWithId; roomId: string }): void {
    if (this.isRoomExists(roomId)) {
      this.rooms.get(roomId)?.delete(user.id);

      if (this.rooms.get(roomId)?.size === 0) {
        this.deleteRoom(roomId);
      }
    }
  }

  notifyRoom({
    roomId,
    notificationFunction,
    excludeUserId = '',
  }: {
    roomId: string;
    notificationFunction: (user: IWebSocketWithId) => void;
    excludeUserId?: string;
  }): void {
    if (this.isRoomExists(roomId)) {
      const room = this.rooms.get(roomId)!;
      room.forEach(user => {
        if (user.id !== excludeUserId) {
          notificationFunction(user);
        }
      });
    }
  }
}

export { WsRoomsService };
