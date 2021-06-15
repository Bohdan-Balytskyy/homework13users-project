import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MyToastrService } from '../my-toastr.service';

import { ServUsersService } from '../serv-users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private servUser: ServUsersService, private toastr: MyToastrService, private router: Router ) { }

  ngOnInit(): void {
  }
  loginUser() {
    let  body = {
      email: this.email,
      password: this.password
    }
    this.servUser.loginUser(`http://localhost:5000/auth/v1/sign-in`, body).subscribe(
      () => {
        this.toastr.successMessage('Логін успішний');
        this.servUser.fetchUsers(`http://localhost:5000/api/v1/users`).subscribe(
          () => {
            for (let i: number = 0; i < this.servUser.users.length; i++) {
              if (this.servUser.users[i].email == this.email) {
                this.servUser.streamUser.next([this.servUser.users[i].name, this.email, this.servUser.users[i].role])
                this.servUser.streamPermit.next(this.servUser.users[i].permissions.split('*'))
                break;
              }
            }
          }
        )
        setTimeout(() => {
          this.router.navigate(['/dashboard'])
        }, 1000);
      },
      (err) =>this.toastr.errorHandling(err)
    )
  }

}
