import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../../../core/services/auth/auth.service';
import {MustMatch} from '../../../../utils/custom-form-validators/must-match.validator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {userNameRE} from "../../../../utils/regexValidators";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hidePassword = true;
  hideConfirmPassword = true;

  form = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get lastName(): FormControl {
    return this.form.get('lastName') as FormControl;
  }

  get userName(): FormControl {
    return this.form.get('userName') as FormControl;
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.form.get('confirmPassword') as FormControl;
  }

  register(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.createUser({
        name: value.name,
        lastName: value.lastName,
        userName: value.userName,
        email: value.email,
        password: value.password
      })
      .then(() => {
        this.snackBar.open('Correctamente registrado!', 'Cerrar', {
          duration: 2000,
        });
        this.router.navigate(['/auth/login']);
      });
    }
  }

  hasError(formControl: FormControl, validatorName: string): boolean {
    return formControl.touched && formControl.hasError(validatorName);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required, Validators.pattern(userNameRE)]),
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }

  async goToLoginPage(): Promise<void> {
    await this.router.navigate(['auth', 'login']);
  }

}
