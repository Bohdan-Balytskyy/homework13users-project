import { Component } from '@angular/core';
import { ServUsersService } from './serv-users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userEmail: string;
  userName: string;
  constructor(private servUser: ServUsersService) {
    this.servUser.stream.subscribe(data => {
      this.userEmail = data[1];
      this.userName = data[0]
      })
   }
}
