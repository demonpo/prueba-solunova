import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../modules/core/services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  isUserLogged = false;

  constructor(
    public authService: AuthService,
    public router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>((subscriber) => {
      this.authService.isUserLogged.subscribe(isUserLogged => {
        console.log(isUserLogged);
        if (isUserLogged) {
          subscriber.next(true);
        } else {
          this.router.navigate(['/auth', 'login']).then(value => {
          });
          subscriber.next(false);
        }
      });
    });
  }

}
