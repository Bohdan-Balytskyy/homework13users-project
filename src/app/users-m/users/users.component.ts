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

  editName1: string = "";
  editPassword1: string = "";
  editEmail1: string = "";

  isEditUser: boolean = true;
  editId = ''
  isNameAdmin: boolean = false;

  style: string = 'style = "width: 150px; height: 30px; border: 1px solid grey; background-color: lightgrey"';

  constructor(private servUser: ServUsersService, private toastr: ToastrService) {
    this.servUser.stream.subscribe(data => {
      data[0] === 'admin' ? this.isNameAdmin = true : this.isNameAdmin = false;
      })
   }

  ngOnInit(): void {
    this.getUsers()
  }
  getUsers():void {
    this.servUser.fetchUsers(`http://localhost:5000/api/v1/users`).subscribe(
      () => {
        this.table1.nativeElement.innerHTML = '';
        for (let i: number = 0; i < this.servUser.users.length; i++) {
          if (this.isNameAdmin) {
            this.table1.nativeElement.innerHTML += `<tr>
            <td ${this.style}>${this.servUser.users[i].id}</td>
            <td ${this.style}>${this.servUser.users[i].name}</td>
            <td ${this.style}>${this.servUser.users[i].created_at.slice(0, 10)}</td>
            <td ${this.style}>${this.servUser.users[i].updated_at.slice(0, 10)}</td>
            <td ${this.style}><input type="button" name="buttonEditStart"
            id="buttonEditStart" value="Змінити юзера"  data-id = ${this.servUser.users[i].id}></td>
            <td ${this.style}><input type="button" name="buttonDel"
            id="buttonDel" value="Видалити юзера" data-id = ${this.servUser.users[i].id}></td>
            </tr>`;
          } else {
            this.table1.nativeElement.innerHTML += `<tr>
            <td ${this.style}>${this.servUser.users[i].id}</td>
            <td ${this.style}>${this.servUser.users[i].name}</td>
            <td ${this.style}>${this.servUser.users[i].created_at.slice(0, 10)}</td>
            <td ${this.style}>${this.servUser.users[i].updated_at.slice(0, 10)}</td></tr>`
          }
        }
        this.toastr.success('Юзери отримані', 'Успіх', {timeOut: 2000})
      },
      (err) => {
         if (err.status === 401) {
          this.toastr.error('Неавторизований юзер (можливо прострочений токен)', `Помилка`, {progressBar: true})
         } else {
          this.toastr.error(`${err.message}`, 'Помилка', {progressBar: true})
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
        this.toastr.success('Юзера додано', 'Успіх', {timeOut: 2000});
        this.getUsers();
      },
      (err) => {
        if (err.status === 400) {
          this.toastr.error(`${err.error.description}`, 'Помилка', {progressBar: true})
        } else if (err.status === 401) {
          this.toastr.error('Неавторизований юзер (можливо прострочений токен)', `Помилка`, {progressBar: true})
         } else {
          this.toastr.error(`${err.message}`, 'Помилка', {progressBar: true}) 
        }
      }
    )
  }
  editUserStart($event) {
    if ($event.target.name === "buttonEditStart") {
      this.isEditUser = false;
      this.editId = $event.target.dataset.id;
    }
  }
  editUser() {
      let  body: NewUser = {
      name: this.editName1,
      password: this.editPassword1,
      email: this.editEmail1
      }
    this.servUser.putUser(this.editId,`http://localhost:5000/api/v1/users/`, body).subscribe(
      () => {
        this.toastr.success('Юзера змінено', 'Успіх', {timeOut: 2000});
        this.getUsers();
      },
      (err) => {
        if (err.status === 400) {
          this.toastr.error(`${err.error.description}`, 'Помилка', {progressBar: true})
        } else if (err.status === 401) {
          this.toastr.error('Неавторизований юзер (можливо прострочений токен)', `Помилка`, {progressBar: true})
         } else {
          this.toastr.error(`${err.message}`, 'Помилка', {progressBar: true}) 
        }
      }
    )
    this.isEditUser = true;
  }
  

  delUser($event) {
    if ($event.target.name === "buttonDel") {
      this.servUser.delUser($event.target.dataset.id,`http://localhost:5000/api/v1/users`).subscribe(
      () => {
        this.toastr.success('Юзера видалено', 'Успіх', {timeOut: 2000});
        this.getUsers();
      },
      (err) => {
        if (err.status === 400) {
          this.toastr.error(`${err.error.description}`, 'Помилка', {progressBar: true})
        } else if (err.status === 401) {
          this.toastr.error('Неавторизований юзер (можливо прострочений токен)', `Помилка`, {progressBar: true})
         } else {
          this.toastr.error(`${err.message}`, 'Помилка', {progressBar: true}) 
        }
      }
    )
    }
  }
}
