import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../../../interfaces/user";
import {environment} from "../../../../../environments/environment";
import {LocalStorageService} from "../local-storage/local-storage.service";
import {SessionInfo} from "../../../../interfaces/sessionInfo";
import {map} from "rxjs/operators";
import {AppState} from "../../../../store/app.reducers";
import {Store} from "@ngrx/store";
import {loadAuthFromLocalStorage} from "../../../../store/actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = "";

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {
    store.select("auth").subscribe(({sessionInfo}) => {
      if(sessionInfo) {
        this.token = sessionInfo.token
      }
    });

    const sessionInfo = this.localStorageService.getOject("sessionInfo") as SessionInfo;
    if (sessionInfo) {
      this.store.dispatch(loadAuthFromLocalStorage({sessionInfo}))
    }

  }

  createUser(user: User): Promise<any> {
    return  this.http.post<User>(environment.apiProxy.signup, {...user}).toPromise();
  }

  login(emailOrUserName: string, password: string): Observable<SessionInfo> {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  AuthService.getBasicStrategyHeader(emailOrUserName, password))
    }
    return  this.http.post<any>(environment.apiProxy.login, {apiKeyToken: environment.apiKeyToken}, header).pipe(
      map(response => {
        this.saveSessionInfoToLocalStorage(response as SessionInfo);
        return response as SessionInfo;
      })
    )
  }

  logout(): void {
    this.token = "";
    this.removeSessionInfoFromLocalStorage();
  }

  private saveSessionInfoToLocalStorage(sessionInfo: SessionInfo): void {
    this.localStorageService.saveOject("sessionInfo", sessionInfo);
  }

  private removeSessionInfoFromLocalStorage(): void {
    this.localStorageService.remove("sessionInfo");
  }


private static getBasicStrategyHeader(emailOrUserName: string, password: string): string {
  const base64User = btoa(`${emailOrUserName}:${password}`);
  return "Basic " + base64User;
}

}
