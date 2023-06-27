import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomService } from '../../custom.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-forgot-password-email',
  templateUrl: './forgot-password-email.component.html',
  styleUrls: ['./forgot-password-email.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, CommonModule, MatProgressSpinnerModule],
})
export class ForgotPasswordEmailComponent {
  form = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  error = false;
  message = '';
  isLoading = false;

  constructor(private route: Router, private service: CustomService) {}

  send() {
    this.isLoading = true;
    this.service.forgotEmail = this.form.value.email as string;
    this.service.forgotPasswordEmail(this.form.value.email as string).subscribe(
      (result: any) => {
        this.route.navigate(['/forgot-password-reset']);
        this.isLoading = false;
      },
      (error) => {
        this.error = true;
        this.message = error.error.message;
        this.isLoading = false;
      }
    );
  }
}
