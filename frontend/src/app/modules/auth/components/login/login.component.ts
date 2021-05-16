import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../../../core/services/auth/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IsEmailOrUserName} from "../../../../utils/custom-form-validators/email-username.validator";



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
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
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
      console.log('VALID');
      const value = this.form.value;
      this.authService.login(value.emailOrUserName, value.password)
      .then((response) => {
        this.router.navigate(['/perfil']).then();
      })
      .catch(() => {
        this.snackBar.open('Usuario o contraseña no valido', 'Cerrar', {
          duration: 2000,
        });
      });
    }
  }

  async goToRegisterPage(): Promise<void> {
    await this.router.navigate(['auth', 'register']);
  }




}
