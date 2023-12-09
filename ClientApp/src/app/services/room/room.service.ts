import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room, RoomSettings } from './room';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private httpClient: HttpClient) {}
  public createRoom(room: any): Observable<any> {
    return this.httpClient.post<any>('api/room/create', room);
  }

  public deleteRoom(roomId: number): Observable<any> {
    return this.httpClient.delete<any>('api/room/' + roomId);
  }

  public getRooms(): Observable<RoomSettings[]> {
    return this.httpClient.get<RoomSettings[]>('api/room/all');
  }

  public getRoomById(id: number): Observable<Room> {
    return this.httpClient.get<Room>('api/room/' + id);
  }

  public validateRoomPassword(
    roomId: number,
    password: string
  ): Observable<any> {
    return this.httpClient.put<any>(
      'api/room/validate-password/' + roomId,
      [password]
    );
  }
}
