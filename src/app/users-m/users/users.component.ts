import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ServUsersService } from 'src/app/serv-users.service';
import { NewUser } from '../../../app/interfaces/newuser'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  name1: string = "";
  password1: string = "";
  email1: string = "";

  editName1: string = "";
  editPassword1: string = "";
  editEmail1: string = "";

  isEditUser: boolean = true;
  editId: string = '';
  isNameAdmin: boolean = false;

  constructor(public servUser: ServUsersService, private toastr: ToastrService) {
    this.servUser.stream.subscribe(data => this.isNameAdmin = data[0] === 'admin')
   }

  ngOnInit(): void {
    this.getUsers()
  }
  errorHandling(err:any) {
    if (err.status === 400) {
      this.toastr.error(`${err.error.description}`, 'Помилка', {progressBar: true})
    } else if (err.status === 401) {
      this.toastr.error('Неавторизований юзер (можливо прострочений токен)', `Помилка`, {progressBar: true})
    } else {
      this.toastr.error(`${err.message}`, 'Помилка', { progressBar: true })
    }
  }
  successMessage(mes: string) {
    this.toastr.success(mes, 'Успіх', {timeOut: 2000})
  }
  getUsers():void {
    this.servUser.fetchUsers(`http://localhost:5000/api/v1/users`).subscribe(
      () => this.successMessage('Юзери отримані'),
      (err) => this.errorHandling(err)
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
        this.successMessage('Юзера додано');
        this.getUsers();
      },
      (err) => this.errorHandling(err)
    )
  }
  editUserStart($event) {
    if ($event.target.name === "buttonEditStart") {
      this.isEditUser = false;
      this.editId = $event.target.id;
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
        this.successMessage('Юзера змінено');
        this.getUsers();
      },
      (err) => this.errorHandling(err)
    )
    this.isEditUser = true;
  }
  delUser($event) {
    if ($event.target.name === "buttonDel") {
      this.servUser.delUser($event.target.id, `http://localhost:5000/api/v1/users`).subscribe(
        () => {
          this.successMessage('Юзера видалено');
          this.getUsers();
        },
        (err) => this.errorHandling(err)
      )
    }
  }
}
