import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from './services/auth/auth.service';
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    // Todos los servicios con patron sigleton van aqui
    AuthService,
  ]
})
export class CoreModule { }
