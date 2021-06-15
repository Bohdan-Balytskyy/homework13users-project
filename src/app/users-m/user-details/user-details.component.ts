import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewUser } from 'src/app/interfaces/newuser';
import { MyToastrService } from 'src/app/my-toastr.service';
import { ServUsersService } from 'src/app/serv-users.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  isCanEditUsers: boolean = false;
  isCanEditUsersFull: boolean = false;
  isCanViewUsersFull: boolean = false;

  @ViewChild('form') form;
  isEditForm: boolean;emailLoggedUser: string;
  isEditUser: boolean = false;
  isUserSeesHimself: boolean;

  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  password: string = '';
  role: string;
  email: string;

  permissionsAll: string[] = ['can_view_users', 'can_view_details', 'can_view_details_full', 'can_edit_users', 'can_edit_users_full', 'can_delete_users', 'can_add_users'];
  permissionsEdit: string[] = ['','','','','','',''];

  constructor(public servUser: ServUsersService, private toastr: MyToastrService, private activateRoute: ActivatedRoute) {
    this.servUser.streamUser.subscribe(data => {
      this.id = activateRoute.snapshot.params['id'];
      this.emailLoggedUser = data[1];
      for (const obj of this.servUser.users) {
        if (obj.id == this.id) {
          this.name = obj.name;
          this.created_at = obj.created_at;
          this.updated_at = obj.updated_at;
          this.role = obj.role;
          this.email = obj.email;   
          for (let i: number = 0; i <  this.permissionsAll.length; i++){
            obj.permissions.split('*').includes(this.permissionsAll[i]) ?
              this.permissionsEdit[i] = this.permissionsAll[i] :
              this.permissionsEdit[i] = '';
          }
        }
      }
    });
    this.servUser.streamPermit.subscribe(data => {
      this.isCanEditUsers = data.includes('can_edit_users');
      this.isCanEditUsersFull = data.includes('can_edit_users_full');
      this.isCanViewUsersFull = data.includes('can_view_details_full');
    });
    this.isUserSeesHimself = this.emailLoggedUser === this.email;
   }

  ngOnInit(): void {
  }
  changePermit($event) {
    let ind = +$event.target.dataset.ind;
    this.permissionsEdit[ind] ? this.permissionsEdit[ind] = this.permissionsAll[ind] : this.permissionsEdit[ind] = '';
  }

  save() {
    let body: NewUser = {
      name: this.name,
      password: this.password,
      email: this.email,
      role: this.role,
      permissions: this.permissionsEdit.join('*')
    }
    if (this.isUserSeesHimself) {
      this.servUser.putUser(`${this.id}`, `http://localhost:5000/api/v1/users/`, body).subscribe(
        () => {
          this.toastr.successMessage('Юзера змінено');
        },
        (err) => this.toastr.errorHandling(err)
      )
    } else {
      this.servUser.patchUser(`${this.id}`, `http://localhost:5000/api/v1/users/`,
        { name: this.name, permissions: this.permissionsEdit.join('*') }).subscribe(
          () => {
            this.toastr.successMessage('Юзера змінено');
          },
          (err) => this.toastr.errorHandling(err)
        )
    }
    this.isEditUser = false;
    this.servUser.streamIsEdit.next([this.isEditForm, this.isEditUser])
  }
  changeForm() {
    this.isEditForm = this.form.dirty;
    this.servUser.streamIsEdit.next([this.isEditForm, this.isEditUser]);
  }
}
