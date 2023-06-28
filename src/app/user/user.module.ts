import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserShowComponent } from './user-show/user-show.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { UserLibraryComponent } from './user-library/user-library.component';
import { UserBoughtComponent } from './user-bought/user-bought.component';

@NgModule({
  declarations: [
    UserShowComponent,
    UserLibraryComponent,
    UserBoughtComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule
  ]
})
export class UserModule { }
