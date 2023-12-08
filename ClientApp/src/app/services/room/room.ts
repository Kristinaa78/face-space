export interface Room {
  id: number;
  name: string;
  count: number;
}

export interface RoomSettings {
  id: number;
  roomName: string;
  roomPassword: string;
  participants: number;
  count: number;
  enableChat: boolean;
  enableVideo: boolean;
  invited: boolean;
}
