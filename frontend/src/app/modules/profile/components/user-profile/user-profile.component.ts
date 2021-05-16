import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "../../../core/services/users/users.service";
import {AuthService} from "../../../core/services/auth/auth.service";
import {Subscription} from "rxjs";
import {User} from "../../../../interfaces/user";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  userSubscription: Subscription | undefined;
  user: User | undefined;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.user$
      .pipe(
        filter(value => !!value)
      )
      .subscribe(user => {
      this.usersService.getUser(user.id || "").subscribe(value => {
        this.user = user;
      })
    });
  }

  onClick(): void {
    this.usersService.getUser(this.user?.id || "").toPromise();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

}
