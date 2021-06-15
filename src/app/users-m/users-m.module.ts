import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { UsersMRoutingModule } from './users-m-routing.module';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormsModule } from '@angular/forms';
import { EditUserGuard } from '../edit-user.guard';

const routes: Routes = [
  { path: ':id', component: UserDetailsComponent, canDeactivate: [EditUserGuard] },
  { path: '', component: UsersComponent }
];

@NgModule({
  declarations: [
    UsersComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    UsersMRoutingModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class UsersMModule { }
