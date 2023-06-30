import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomService } from '../../custom.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  standalone: true,
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
})
export class LoginPageComponent {
  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  error = false;
  isLoading = false;
  passwordVisible = false;

  constructor(public route: Router, private service: CustomService) {}

  login() {
    this.isLoading = true;
    this.service
      .login(
        this.form.value.email as string,
        this.form.value.password as string
      )
      .subscribe(
        (result: any) => {
          this.isLoading = false;
          localStorage.setItem('email', result.email);
          localStorage.setItem('username', result.username);
          this.service.user = result;
          this.service.setRole(result.role);
          if (result.isVerified) {
            localStorage.setItem('jwt', result.token);
            this.route.navigate(['/']);
            this.service.setLoginStatus(true);
            this.service.setUsername(result.username);
          } else {
            this.route.navigate(['/verify']);
          }
        },
        (error) => {
          this.isLoading = false;
          this.error = true;
        }
      );
  }

  signUp() {
    this.route.navigate(['/register']);
  }

  forgotPassword() {
    this.route.navigate(['/forgot-password-email']);
  }

  setVisiblity() {
    this.passwordVisible = !this.passwordVisible;
  }

  ngOnInit(): void {}
}
