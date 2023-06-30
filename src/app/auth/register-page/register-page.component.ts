import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { CustomService } from '../../custom.service';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  standalone: true,
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
})
export class RegisterPageComponent implements OnInit {
  constructor(private service: CustomService, private router: Router) {}

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    tip: new FormControl('', Validators.required),
    jurassicAccount: new FormControl('', Validators.required),
    stateOfOrigin: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    nazivKompanije: new FormControl('', Validators.required),
    tipPreduzeca: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.form.get('tip')?.valueChanges.subscribe((value) => {
      this.showOtherInputs = value === 'reporter';
    });
  }

  showOtherInputs = false;
  passwordVisible1 = false;
  passwordVisible2 = false;
  error = false;
  isLoading = false;
  pom = '';

  signup() {
    if (this.form.value.password !== this.form.value.confirmPassword) {
      alert('Passwords do not match!');
      this.error = true;
      return;
    } else if (this.form.value.tip === '') {
      alert('Tip preduzeca is required!');
      this.error = true;
      return;
    }
    this.pom = this.form.value.password as string;
    if (this.pom.length < 8) {
      alert('Password must be at least 8 characters long!');
      this.error = true;
      return;
    } else if (this.form.value.tip === 'reporter') {
      this.isLoading = true;
      this.service.signUpReporter(this.form.value).subscribe(
        (response) => {
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        (error) => {
          this.error = true;
          this.isLoading = false;
          alert('Something went wrong!');
        }
      );
    } else if (this.form.value.tip === 'klijent') {
      this.service.signUpKlijent(this.form.value).subscribe(
        (response) => {
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        (error) => {
          this.error = true;
          this.isLoading = false;
          alert('Something went wrong!');
        }
      );
    }
  }
}
