import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../../../core/services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IsEmailOrUserName} from "../../../../utils/custom-form-validators/email-username.validator";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/app.reducers";
import * as actions from "../../../../store/actions";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  form = new FormGroup({
    emailOrUserName: new FormControl('', [Validators.required, IsEmailOrUserName()]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe( ({ sessionInfo, loading, error }) => {
      if(error) {
        this.snackBar.open('Usuario o contraseña no valido', 'Cerrar', {
          duration: 2000,
        });
      }
      if(sessionInfo) {
        this.router.navigate(['/perfil']).then();
      }

    });
  }

  get emailOrUserName(): FormControl {
    return this.form.get('emailOrUserName') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  hasError(formControl: FormControl, validatorName: string): boolean {
    return formControl.touched && formControl.hasError(validatorName);
  }

  login(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.store.dispatch(actions.login({
        emailOrUserName: value.emailOrUserName as string,
        password: value.password as string
      }));
    }
  }

  async goToRegisterPage(): Promise<void> {
    await this.router.navigate(['auth', 'register']);
  }




}
