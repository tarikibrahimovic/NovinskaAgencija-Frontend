import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomService } from '../../custom.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forgot-password-reset',
  templateUrl: './forgot-password-reset.component.html',
  styleUrls: ['./forgot-password-reset.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, CommonModule, MatProgressSpinnerModule, MatIconModule],
})
export class ForgotPasswordResetComponent {

  form = new FormGroup({
    token: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  error = false;
  message = '';
  isLoading = false;
  email = '';
  passwordVisible = false;
  passwordVisible2 = false;


  constructor(private route: Router, private service: CustomService) {
  }

  reset() {
    this.isLoading = true;
    if(this.form.value.password != this.form.value.confirmPassword){
      this.error = true;
      this.isLoading = false;
      return;
    }
    this.service.forgotPassword(this.form.value.token as string, this.form.value.password as string).subscribe(
      (result: any) => {
        this.isLoading = false;
        this.route.navigate(['/login']);
      },
      (error) => {
        this.error = true;
        this.isLoading = false;
      }
    );

  }
}
