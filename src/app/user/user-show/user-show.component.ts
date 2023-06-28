import { Component } from '@angular/core';
import { CustomService } from 'src/app/custom.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.css'],
})
export class UserShowComponent {
  /**
   *
   */
  constructor(
    public service: CustomService,
    public dialog: MatDialog,
    private router: Router
  ) {
    if (this.service.user == null) {
      this.router.navigate(['/login']);
    } else {
      this.service.username.subscribe((result: any) => {
        this.username = result;
      });
    }
  }

  formUsername = new FormGroup({
    username: new FormControl(''),
  });

  formPassword = new FormGroup({
    old: new FormControl(''),
    confirm: new FormControl(''),
  });

  formDelete = new FormGroup({
    password: new FormControl(''),
  });

  passwordVisible = false;
  passwordVisible2 = false;
  passwordVisible3 = false;
  isLoading = false;
  username = '';

  proba(){
    console.log(this.service.user.imageUrl);
  }

  deleteImage(){
    this.isLoading = true;
    this.service.deleteImage().subscribe(
      (result: any) => {
        this.isLoading = false;
        this.service.user.imageUrl = null;
      },
      (error) => {
        alert('Something went wrong!');
        this.isLoading = false;
      }
    );
  }

  changePassword() {
    console.log(this.formPassword.value.old);
    console.log(this.formPassword.value.confirm);
    if (
      this.formPassword.value.old == '' ||
      this.formPassword.value.confirm == ''
    ) {
      alert('Password can not be empty!');
      return;
    }
    this.isLoading = true;
    this.service
      .changePassword(
        this.formPassword.value.confirm as string,
        this.formPassword.value.old as string
      )
      .subscribe(
        (result: any) => {
          this.formPassword.value.old = '';
          this.formPassword.value.confirm = '';
          this.isLoading = false;
          alert('Password changed!');
          this.router.navigate(['/']);
        },
        (error) => {
          alert('Something went wrong!');
          this.isLoading = false;
        }
      );
  }

  changeUsername() {
    console.log(this.formUsername.value.username);
    if (this.formUsername.value.username == '') {
      alert('Username can not be empty!');
      return;
    }
    this.isLoading = true;
    this.service
      .changeUsername(this.formUsername.value.username as string)
      .subscribe(
        (result: any) => {
          console.log(result);
          this.service.user.username = result.username;
          this.service.setUsername(result.username);
          this.router.navigate(['/']);
          this.formUsername.value.username = '';
          this.isLoading = false;
        },
        (error) => {
          alert('Something went wrong!');
          this.isLoading = false;
        }
      );
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account?')) {
      this.isLoading = true;
      this.service
        .deleteAccount(this.formDelete.value.password as string)
        .subscribe(
          (result: any) => {
            this.isLoading = false;
            localStorage.removeItem('jwt');
            localStorage.removeItem('email');
            this.service.user = null;
            this.service.setLoginStatus(false);
            this.service.setRole(-1);
            this.router.navigate(['/login']);
          },
          (error) => {
            alert('Something went wrong!');
            this.isLoading = false;
          }
        );
    }
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'dialog-animations-example-dialog',
  // templateUrl: 'dialog-animations-example-dialog.html',
  template: `
    <h1 mat-dialog-title>Upload Image</h1>
    <div mat-dialog-content>
      <form [formGroup]="form" *ngIf="!isLoading else proba">
        <input type="file" formControlName="image" (change)="change($event)" />
      </form>
      <ng-template #proba>
        <mat-spinner></mat-spinner>
      </ng-template>
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close [disabled]="isLoading">No</button>
      <button mat-button mat-dialog-close cdkFocusInitial (click)="submit()" [disabled]="isLoading">Ok</button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatProgressSpinnerModule],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, private service: CustomService, private router: Router) {}

  form = new FormGroup({
    image: new FormControl(''),
  });

  isLoading = false;

  image: File | null = null;

  change(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files.item(0);
    this.image = file;
  }

  submit(){
    if(this.image == null){
      alert("Please select an image!");
      return;
    }
    //if the file is not an image
    if(this.image.type.split('/')[0] !== 'image'){
      alert("Please select an image!");
      return;
    }
    this.isLoading = true;
    this.service.uploadPicture(this.image).subscribe((result: any) => {
      this.isLoading = false;
      alert("Image uploaded!");
      this.service.user.image = result.image;
      this.dialogRef.close();
      this.router.navigate(['/']);
    }, (error) => {
      this.isLoading = true;
      alert("Something went wrong!");
    });
  }
}
