/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { v4 as uuidv4 } from 'uuid';

interface IWithId {
  id: string;
}

class RoomsManager<U extends IWithId> {
  private rooms: Map<string, Map<string, U>>;

  constructor() {
    this.rooms = new Map();
  }

  createRoom(): string {
    const roomId = uuidv4();
    this.rooms.set(roomId, new Map());
    return roomId;
  }

  deleteRoom(roomId: string): void {
    this.rooms.delete(roomId);
  }

  joinRoom({ user, roomId }: { user: U; roomId: string }): void {
    if (this.rooms.has(roomId)) {
      this.rooms.get(roomId)?.set(user.id, user);
    }
  }

  leaveRoom({ user, roomId }: { user: U; roomId: string }): void {
    if (this.rooms.has(roomId)) {
      this.rooms.get(roomId)?.delete(user.id);

      if (this.rooms.get(roomId)?.size === 0) {
        this.deleteRoom(roomId);
      }
    }
  }

  notifyRoom({ roomId, notificationFunction }: { roomId: string; notificationFunction: (user: U) => void }): void {
    if (this.rooms.has(roomId)) {
      const room = this.rooms.get(roomId)!;
      room.forEach(user => {
        notificationFunction(user);
      });
    }
  }
}

export { RoomsManager };
