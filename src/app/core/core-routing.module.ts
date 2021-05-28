import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from '../login/login.component'

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('../dashboard-m/dashboard-m.module').then(m=>m.DashboardMModule)},
  { path: 'users', loadChildren: () => import('../users-m/users-m.module').then(m=>m.UsersMModule)},
  { path: 'login', component: LoginComponent },
  { path: 'my-page', loadChildren: () => import('../my-page-m/my-page-m.module').then(m=>m.MyPageMModule)},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', loadChildren: () => import('../not-found-m/not-found-m.module').then(m=>m.NotFoundMModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
