import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: any;

  constructor(private httpClient: HttpClient) { }
  public register(newUser: any): Observable<any> {
    return this.httpClient.post<any>('api/user/register/', newUser);
  }

  public login(user: any): Observable<any> {
    return this.httpClient.post<any>('api/user/login/', user);
  }

  public signOut(): Observable<any> {
    return this.httpClient.delete<any>('api/user/sign-out/');
  }

  public getUser(): Observable<any> {
    return this.httpClient.get<string>('api/user/user/');
  }
}
