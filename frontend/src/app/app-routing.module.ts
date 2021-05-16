import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import {LoginLayoutComponent} from './layouts/login-layout/login-layout.component';

import {AppLayoutComponent} from './layouts/app-layout/app-layout.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AuthGuardGuard} from "./guards/auth-guard/auth-guard.guard";

const routes: Routes = [
    {
    path: '',
    canActivate: [AuthGuardGuard],
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/perfil',
        pathMatch: 'full',
      },
      {
        path: 'perfil',
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
      },
    ]
  },
  {
    path: 'auth',
    component: LoginLayoutComponent,
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
