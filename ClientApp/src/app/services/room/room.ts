export interface Room {
  id: number;
  name: string;
  count: number;
}

export interface RoomSettings {
  roomName: string;
  password: string;
  participants: number;
  enableChat: boolean;
  enableVideo: boolean;
}
