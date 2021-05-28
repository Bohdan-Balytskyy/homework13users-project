import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ServUsersService } from 'src/app/serv-users.service';
import { NewUser } from '../../../app/interfaces/newuser'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  @ViewChild("table1") table1;

  name1: string = "";
  password1: string = "";
  email1: string = "";

  style: string = 'style = "width: 150px; height: 30px; border: 1px solid grey; background-color: lightgrey"';

  constructor(private servUser: ServUsersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUsers()
  }
  getUsers():void {
    this.servUser.fetchUsers(`http://localhost:5000/api/v1/users`).subscribe(
      () => {
        this.table1.nativeElement.innerHTML = '';
        for (let i: number = 0; i < this.servUser.users.length; i++) {
          this.table1.nativeElement.innerHTML += `<tr>
        <td ${this.style}>${this.servUser.users[i].id}</td>
        <td ${this.style}>${this.servUser.users[i].name}</td>
        <td ${this.style}>${this.servUser.users[i].email}</td>
        <td ${this.style}>${this.servUser.users[i].created_at.slice(0, 10)}</td>
        <td ${this.style}>${this.servUser.users[i].updated_at.slice(0, 10)}</td>
        </tr>`;
        }
        this.toastr.success('Юзери отримані', 'Успіх')
      },
      (err) => {
         if (err.status === 401) {
          this.toastr.error('Неавторизований юзер (можливо прострочений токен)', `Помилка`, {
            timeOut: 10000,
            progressBar: true
          })
         } else {
           this.toastr.error(`${err.message}`, 'Помилка', {
             timeOut: 10000,
             progressBar: true
           })
         }
      }
    )
  }

  addUser() {
    let  body: NewUser = {
      name: this.name1,
      password: this.password1,
      email: this.email1
    }
    this.servUser.addUser(`http://localhost:5000/api/v1/users`, body).subscribe(
      () => {
        this.toastr.success('Юзера додано', 'Успіх');
        this.getUsers();
      },
      (err) => {
        if (err.status === 400) {
          this.toastr.error(`${err.error.description}`, 'Помилка', {
            timeOut: 10000,
            progressBar: true
          })
        } else if (err.status === 401) {
          this.toastr.error('Неавторизований юзер (можливо прострочений токен)', `Помилка`, {
            timeOut: 10000,
            progressBar: true
          })
         } else {
          this.toastr.error(`${err.message}`, 'Помилка', {
            timeOut: 10000,
            progressBar: true
          }) 
        }
      }
    )
  }
}
