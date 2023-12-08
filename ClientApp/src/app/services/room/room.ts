export interface Room {
  id: number;
  roomName: string;
  participants: number;
  enableChat: boolean;
  enableVideo: boolean;
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
