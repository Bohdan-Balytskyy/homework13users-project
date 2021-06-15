import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
import { ServUsersService } from './serv-users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLogin: boolean;
  constructor(private servUser: ServUsersService, private router: Router) {
    this.servUser.streamUser.subscribe(data => {
      this.isLogin = data[1] !== ''
    })
  }
  checkLogin(): boolean{
    if (this.isLogin) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    // Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    boolean {
      return this.checkLogin();
    }
  
}
