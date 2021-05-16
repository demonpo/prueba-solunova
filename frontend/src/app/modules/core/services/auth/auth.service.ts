import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../../../interfaces/user";
import {environment} from "../../../../../environments/environment";
import {LocalStorageService} from "../local-storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // @ts-ignore
  user$: Subject<User> = new BehaviorSubject<User>(null);
  token: string = "";

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.getLocalStorageForUser()
  }

  private getLocalStorageForUser() : void {
    const user = this.localStorageService.getOject("user") as User;
    const token = this.localStorageService.get("token");
    if (!user || !token) {return    }
    this.user$.next( user);
    this.token = token;
  }

  private saveUserAndTokenToLocalStorage(user: User, token: string): void {
    this.localStorageService.saveOject("user", user);
    this.localStorageService.save("token", token);
  }

  private setUserAndToken(user: User, token: string): void {
    this.token = token;
    this.user$.next(user);
  }

  private removeUserAndTokenFromLocalStorage(): void {
    this.localStorageService.remove("user");
    this.localStorageService.remove("token");
  }

  private removeUserAndToken(): void {
    this.token = "";
    this.user$.next(undefined);
  }

  get isUserLogged(): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      this.user$.subscribe(user => {
        console.log(user);
        if (user) {
          console.log(true);
          subscriber.next(true);
        } else {
          console.log(false);
          subscriber.next(false);
        }
      });
    });
  }

  createUser(user: User): Promise<any> {
    return  this.http.post<User>(environment.apiProxy.signup, {...user}).toPromise();
  }

  login(emailOrUserName: string, password: string): Promise<any> {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  AuthService.getBasicStrategyHeader(emailOrUserName, password))
    }
    return  this.http.post<any>(environment.apiProxy.login, {apiKeyToken: environment.apiKeyToken}, header)
      .toPromise()
      .then(response => {
        this.setUserAndToken(response.user, response.token);
        this.saveUserAndTokenToLocalStorage(response.user, response.token);
        return response.user;
      });

  }

  logout(): Promise<any> {
    // @ts-ignore
    this.removeUserAndToken();
    this.removeUserAndTokenFromLocalStorage();
    return Promise.resolve();
  }


  private static getBasicStrategyHeader(emailOrUserName: string, password: string): string {
    const base64User = btoa(`${emailOrUserName}:${password}`);
    return "Basic " + base64User;
  }

}
