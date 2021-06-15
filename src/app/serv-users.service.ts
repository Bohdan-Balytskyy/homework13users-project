import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '../app/interfaces/user'
import { NewUser } from '../app/interfaces/newuser'

let token: string = '';

@Injectable({
  providedIn: 'root'
})
export class ServUsersService {
  
  public users: User[] = [];
  public streamUser = new BehaviorSubject(['', '', '']);
  public streamPermit = new BehaviorSubject(['']);
  public streamIsEdit = new BehaviorSubject([false,false]);
  public userLogged: User;
  public isEdit: boolean;

  constructor(private http: HttpClient) {
    this.streamIsEdit.subscribe(value => this.isEdit = value[0] && value[1]);
  }
  setHeaders(token) {
    let header = new HttpHeaders().set('Authorization', token);
    return {headers: header}
  }
  fetchUsers(url: string): Observable<User[]> {
    return this.http.get<User[]>(url, this.setHeaders(token))
      .pipe(tap(user => {
        this.users = user
      }))
  }
  addUser(url: string, body: NewUser): Observable<string>{
    return this.http.post<string>(url, body, this.setHeaders(token))
  }
  putUser(id: string, url: string, body: NewUser): Observable<string>{
    return this.http.put<string>(url+id, body, this.setHeaders(token))
  }
  delUser(id: string, url: string): Observable<string>{
    return this.http.delete<string>(url+'/'+id, this.setHeaders(token))
  }
  patchUser(id: string, url: string, body: {name: string,permissions: string}): Observable<string>{
    return this.http.patch<string>(url+id, body, this.setHeaders(token))
  }
  loginUser(url: string, body: {email:string, password: string}): Observable<{access_token:string}>{
    return this.http.post<{access_token:string}>(url, body).
      pipe(tap(token1=> {
        token = token1.access_token;
    }))
  }
}
