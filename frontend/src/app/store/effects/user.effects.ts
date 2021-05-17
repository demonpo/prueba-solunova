import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {UsersService} from "../../modules/core/services/users/users.service";



@Injectable()
export class UserEffects {

    constructor(
        private actions$: Actions,
        private usersService: UsersService
    ){}


    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType( userActions.cargarUsuario ),
            mergeMap(
                ( action ) => this.usersService.getUser( action.id ).pipe()
                    .pipe(
                        map( user => userActions.cargarUsuarioSuccess({ user: user }) ),
                        catchError( err => of(userActions.cargarUsuarioError({ payload: err })) )
                    )
            )
        )
    );

}
