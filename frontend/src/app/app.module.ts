import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppLayoutComponent} from "./layouts/app-layout/app-layout.component";
import {LoginLayoutComponent} from "./layouts/login-layout/login-layout.component";
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from "./modules/core/core.module";
import {MaterialModule} from "./modules/material/material.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./modules/core/interceptors/auth.interceptor";
import {CheckJwtTokenInterceptor} from "./modules/core/interceptors/check-jwt-token.interceptor";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {appReducers} from "./store/app.reducers";
import {EffectsArray} from "./store/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    LoginLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot( appReducers ),
    EffectsModule.forRoot( EffectsArray ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    CoreModule,
    MaterialModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CheckJwtTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
