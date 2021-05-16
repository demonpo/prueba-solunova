import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import {ProfileRoutingModule} from "./profile-routing.module";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {MaterialModule} from "../material/material.module";



@NgModule({
  declarations: [
    ProfileComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule
  ]
})
export class ProfileModule { }
