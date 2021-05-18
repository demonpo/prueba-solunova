import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {User} from "../../../../interfaces/user";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(
    private http: HttpClient
  ) { }

  getUser(userId: string): Observable<User> {
    return this.http.get<any>(environment.apiProxy.users + "/" + userId)
      .pipe(
        map(response => response.data as User)
      );
  }

}
