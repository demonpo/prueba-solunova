import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../modules/core/services/auth/auth.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducers";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {


  constructor(
    public authService: AuthService,
    public router: Router,
    private store: Store<AppState>
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>((subscriber) => {
      this.store.select("auth").subscribe(({ sessionInfo, loading, error }) => {
        if (sessionInfo) {
          subscriber.next(true);
        } else {
          this.router.navigate(['/auth', 'login']).then(value => {});
          subscriber.next(false);
        }
      });
    });
  }

}
