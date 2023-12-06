import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {

  constructor(private httpClient: HttpClient) {}
  public createRoom(roomName: string): Observable<any> {
    return this.httpClient.post<any>('api/room/create/' + roomName, {});
  }

  public deleteRoom(roomId: number): Observable<any> {
    return this.httpClient.delete<any>('api/room/' + roomId);
  }

  public getRooms(): Observable<any> {
    return this.httpClient.get<any>('api/room/');
  }
}