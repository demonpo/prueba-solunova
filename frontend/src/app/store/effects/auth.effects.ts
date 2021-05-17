import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import * as authActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {AuthService} from "../../modules/core/services/auth/auth.service";
import {fromPromise} from "rxjs/internal-compatibility";
import {Router} from "@angular/router";



@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ){}


    login$ = createEffect(
        () => this.actions$.pipe(
            ofType( authActions.login ),
            mergeMap(
                ( action ) => this.authService.login( action.emailOrUserName, action.password ).pipe()
                    .pipe(
                        map( sessionInfo => authActions.loginSuccess({ sessionInfo }) ),
                        catchError( err => of(authActions.loginError({ payload: err })) )
                    )
            )
        )
    );


  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType( authActions.logout ),
      tap(x => {
        this.router.navigate(['/auth', "login"]);
        this.authService.logout();
      })
    ),
    {dispatch: false}
  );

}
