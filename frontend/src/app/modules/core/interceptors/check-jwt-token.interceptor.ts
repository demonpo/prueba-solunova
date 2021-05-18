import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {AuthService} from "../services/auth/auth.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/app.reducers";
import {logout} from "../../../store/actions";


@Injectable()
export class CheckJwtTokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          console.log("INTERCEPTOR")
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            if (this.authService.token && error.statusText === "Unauthorized") {this.store.dispatch(logout({payload: ""}))}
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          return throwError(errorMessage);
        })
      )
  }
}
