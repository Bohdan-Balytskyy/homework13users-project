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
  public header;
  public stream = new BehaviorSubject(['', '']);
  
  constructor(private http: HttpClient) {
  }

  fetchUsers(url: string): Observable<User[]> {
    this.header = new HttpHeaders().set('Authorization', token);
    return this.http.get<User[]>(url, {headers: this.header})
      .pipe(tap(user => {
        this.users = user
      }))
  }
  addUser(url: string, body: NewUser): Observable<string>{
    this.header = new HttpHeaders().set('Authorization', token);
    return this.http.post<string>(url, body, {headers: this.header})
  }
  putUser(id: string, url: string, body: NewUser): Observable<string>{
    this.header = new HttpHeaders().set('Authorization', token);
    return this.http.put<string>(url+id, body, {headers: this.header})
  }
  delUser(id: string, url: string): Observable<string>{
    this.header = new HttpHeaders().set('Authorization', token);
    return this.http.delete<string>(url+'/'+id, {headers: this.header})
  }
  loginUser(url: string, body: {email:string, password: string}): Observable<{access_token:string}>{
    return this.http.post<{access_token:string}>(url, body).
      pipe(tap(token1=> {
        token = token1.access_token;
        console.log(token);
    }))
  }
}
