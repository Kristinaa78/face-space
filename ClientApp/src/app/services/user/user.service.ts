import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  public register(newUser: any): Observable<any> {
    return this.httpClient.post<any>('api/user/register/', newUser);
  }

  public login(user: any): Observable<any> {
    return this.httpClient.post<any>('api/user/login/', user);
  }
}
