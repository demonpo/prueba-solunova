import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(
    private http: HttpClient
  ) { }

  getUser(userId: string) {
    return this.http.get(environment.apiProxy.users +"/" + userId);
  }

}
