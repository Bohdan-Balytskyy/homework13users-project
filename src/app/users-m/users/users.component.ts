import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyToastrService } from 'src/app/my-toastr.service';

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
  role1: string = "";

  adminPermissions: string[] = ["can_view_users", "can_view_details_full", "can_edit_users_full", "can_delete_users", "can_add_users"]
  emailLoggedUser: string;

  isUserCanAdd: boolean = false;
  isUserCanViev: boolean = false;
  isCanVievDetails: boolean = false;
  isCanDeleteUsers: boolean = false;

  constructor(public servUser: ServUsersService, private toastr: MyToastrService, private router: Router) {
    this.servUser.streamUser.subscribe(data => {
      this.emailLoggedUser = data[1];
    });
    this.servUser.streamPermit.subscribe(data => {
      this.isUserCanAdd = data.includes('can_add_users');
      this.isUserCanViev = data.includes('can_view_users');
      this.isCanVievDetails = data.includes('can_view_details') || data.includes('can_view_details_full');
      this.isCanDeleteUsers = data.includes('can_delete_users');
    });
   }

  ngOnInit(): void {
    this.getUsers()
  }
  getUsers():void {
    this.servUser.fetchUsers(`http://localhost:5000/api/v1/users`).subscribe(
      () => this.toastr.successMessage('Юзери отримані'),
      (err) => this.toastr.errorHandling(err)
    )
  }
  addUser() {
    let  body: NewUser = {
      name: this.name1,
      password: this.password1,
      email: this.email1,
      role: this.role1,
      permissions: this.role1 === 'admin' ? this.adminPermissions.join('*') : ""
    }
    this.servUser.addUser(`http://localhost:5000/api/v1/users`, body).subscribe(
      () => {
        this.toastr.successMessage('Юзера додано');
        this.getUsers();
      },
      (err) => this.toastr.errorHandling(err)
    )
  }

  delUser($event) {
    if ($event.target.name === "buttonDel") {
      this.servUser.delUser($event.target.id, `http://localhost:5000/api/v1/users`).subscribe(
        () => {
          this.toastr.successMessage('Юзера видалено');
          this.getUsers();
        },
        (err) => this.toastr.errorHandling(err)
      )
    }
  }
  showDetails($event) {
    if ($event.target.name === "buttonDetails") {
      this.router.navigate([`users/${$event.target.id}`]);
    }
  }
}
