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

  signup() {
    if (this.form.value.password !== this.form.value.confirmPassword) {
      alert('Passwords do not match!');
      this.error = true;
      return;
    } else if (this.form.value.tip === '') {
      alert('Tip preduzeca is required!');
      this.error = true;
      return;
    } else if (this.form.value.tip === 'reporter') {
      this.service.signUpReporter(this.form.value).subscribe(
        (response) => {
          this.router.navigate(['/login']);

        },
        (error) => {
          this.error = true;
          console.log(error);
          alert('Something went wrong!');
        }
      );
    } else if (this.form.value.tip === 'klijent') {
      this.service.signUpKlijent(this.form.value).subscribe(
        (response) => {
          this.router.navigate(['/login']);
        },
        (error) => {
          this.error = true;
          console.log(error);
          alert('Something went wrong!');
        }
      );
    }
  }
}
