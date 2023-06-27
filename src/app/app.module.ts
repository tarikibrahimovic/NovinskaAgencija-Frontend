import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { ReporterGuard } from './reporter.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { RegisterPageComponent } from './auth/register-page/register-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { VerifyPageComponent } from './auth/verify-page/verify-page.component';
import { ForgotPasswordEmailComponent } from './auth/forgot-password-email/forgot-password-email.component';
import { ForgotPasswordResetComponent } from './auth/forgot-password-reset/forgot-password-reset.component';
import { ArticleModule } from './article/article.module';
import { ArticleShowComponent } from './article/articlePages/article-show/article-show.component';
import { ArticleAddComponent } from './article/articlePages/article-add/article-add.component';
import { ArticleSingleComponent } from './article/articlePages/article-single/article-single.component';
import { ArticleBuyComponent } from './article/articlePages/article-buy/article-buy.component';


@NgModule({
  declarations: [AppComponent, HomePageComponent, ErrorPageComponent],
  imports: [
    ArticleModule,
    ForgotPasswordResetComponent,
    ForgotPasswordEmailComponent,
    VerifyPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomePageComponent },
      {
        path: 'article',
        component: ArticleShowComponent,
      },
      {
        path: 'add-article',
        component: ArticleAddComponent,
        canActivate: [ReporterGuard],
      },
      {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'register',
        component: RegisterPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'article/:id',
        component: ArticleSingleComponent,
      },
      {
        path: 'articleBuy/:id',
        component: ArticleBuyComponent
      },
      {
        path: 'verify',
        component: VerifyPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'forgot-password-email',
        component: ForgotPasswordEmailComponent,
      },
      {
        path: 'forgot-password-reset',
        component: ForgotPasswordResetComponent,
      },
      { path: '**', component: ErrorPageComponent },
    ]),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
