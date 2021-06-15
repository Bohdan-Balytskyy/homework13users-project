import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServUsersService } from './serv-users.service';
import { UserDetailsComponent } from './users-m/user-details/user-details.component';

@Injectable({
  providedIn: 'root'
})
export class EditUserGuard implements CanDeactivate<UserDetailsComponent> {
  isEdit: boolean;
  constructor(private servUser:ServUsersService) {
    this.servUser.streamIsEdit.subscribe(
      value => this.isEdit = value[0] && value[1]
    )
    

  }
  canDeactivate(
    component: UserDetailsComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot):
    // Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    boolean
  {
    return this.isEdit ? confirm('Ви дійсно хочете покинути сторінку редагування?'): true;
  }
  
}
