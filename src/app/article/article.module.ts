import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleShowComponent } from './articlePages/article-show/article-show.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ArticleAddComponent } from './articlePages/article-add/article-add.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { ArticleSingleComponent } from './articlePages/article-single/article-single.component';
import { ArticleBuyComponent } from './articlePages/article-buy/article-buy.component';

@NgModule({
  declarations: [ArticleShowComponent, ArticleAddComponent, ArticleSingleComponent, ArticleBuyComponent],
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
    MatCardModule
  ],
})
export class ArticleModule {}
