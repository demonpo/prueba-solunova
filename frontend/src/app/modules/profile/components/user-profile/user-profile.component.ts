import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "../../../core/services/users/users.service";
import {AuthService} from "../../../core/services/auth/auth.service";
import {Subscription} from "rxjs";
import {User} from "../../../../interfaces/user";
import {filter} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducers";
import {cargarUsuario} from "../../../../store/actions";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  userSubscription: Subscription | undefined;
  user: User = {
    id: "",
    email: "",
    name: "",
    userName: "",
    lastName: "",
  };

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe( ({ sessionInfo, loading, error }) => {

      if (sessionInfo) {
        // @ts-ignore
        this.store.dispatch( cargarUsuario({ id: sessionInfo.user.id }) );
      }
    });
    this.store.select('user').subscribe( ({ user, loading, error }) => {
      if (user){
        this.user = user;
      }
    });
  }

  ngOnDestroy(): void {
  }

}
