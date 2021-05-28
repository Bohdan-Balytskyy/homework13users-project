import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


import { User } from '../app/interfaces/user'
import { NewUser } from '../app/interfaces/newuser'

const token: string = '';   //токен сюди

@Injectable({
  providedIn: 'root'
})
export class ServUsersService {
  
  public users: User[] = [];
  public header = new HttpHeaders().set('Authorization', token);

  constructor(private http:HttpClient) { }

  fetchUsers(url: string): Observable<User[]> {
    return this.http.get<User[]>(url, {headers: this.header})
      .pipe(tap(user => {
        this.users = user
      }))
  }
  addUser(url: string, body: NewUser): Observable<string>{
    return this.http.post<string>(url, body, {headers: this.header})
  }
}
