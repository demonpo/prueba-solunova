import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
//import {AuthService} from '../../modules/core/services/auth/auth.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {environment} from '../../../environments/environment';
import {NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {AuthService} from "../../modules/core/services/auth/auth.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducers";
import * as actions from "../../store/actions";

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  navLinks = environment.modulesNavlinks;
  pageTitle = '';

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.setPageTitle(this.router.routerState.snapshot.url);
    this.listenRouterChanges();
  }

  listenRouterChanges(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .pipe(
        map(value => value as NavigationEnd)
      )
      .subscribe(event => {
        this.setPageTitle(event.url);
      });
  }

  setPageTitle(url: string): void {
    for (const navLink of this.navLinks) {
      if (url === '/' + navLink.navLink) {
        this.pageTitle = navLink.name;
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.store.dispatch(actions.logout({payload: ""}))
    //this.authService.logout();
  }

}
