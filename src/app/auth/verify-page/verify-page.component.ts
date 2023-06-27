import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomService } from '../../custom.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-page',
  templateUrl: './verify-page.component.html',
  styleUrls: ['./verify-page.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, CommonModule],
})
export class VerifyPageComponent {
  constructor(private route: Router, private service: CustomService) {}

  form = new FormGroup({
    token: new FormControl('', Validators.required),
  });

  error = false;
  message = '';
  countdown = 'Resend Email';

  verify() {
    this.service.verifyAccount(this.form.value.token as string).subscribe(
      (result: any) => {
        this.service.user = result;
        this.route.navigate(['/']);
      },
      (error) => {
        this.error = true;
      }
    );
  }

  resend() {
    console.log(this.service.user);
    if (this.countdown != 'Resend Email') {
      return;
    }
    let time = 60;
    this.countdown = time.toString();
    let interval = setInterval(() => {
      time--;
      this.countdown = time.toString();
      if (time == 0) {
        clearInterval(interval);
        this.countdown = 'Resend Email';
      }
    }, 1000);
    this.service.resendVerification().subscribe(
      (result: any) => {
        console.log(result);
        this.message = result.message;
      },
      (error) => {
        this.error = true;
        time = 0;
      }
    );
  }
}
