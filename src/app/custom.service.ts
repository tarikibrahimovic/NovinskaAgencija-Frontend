import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
// import {environment} from "../environments/environment";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomService {
  // url = environment.apiUrl;
  url = 'https://newsly.bsite.net/api';
  user: any = {};
  public isLoggedIn: Subject<boolean>;
  forgotEmail = '';
  articles: any = [];
  public role: BehaviorSubject<number>;
  public username: BehaviorSubject<string>;

  getRole(): Observable<number> {
    return this.role;
  }

  setRole(value: number) {
    this.role.next(value);
  }

  getLoginStatus(): Observable<boolean> {
    return this.isLoggedIn;
  }

  setLoginStatus(value: boolean) {
    this.isLoggedIn.next(value);
  }

  getUsername(): Observable<string> {
    return this.username;
  }

  setUsername(value: string) {
    this.username.next(value);
  }

  constructor(private http: HttpClient) {
    this.isLoggedIn = new Subject<boolean>();
    this.role = new BehaviorSubject<number>(-1);
    this.username = new BehaviorSubject<string>('');
    console.log(environment);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.url}/Auth/login`, {
      email: email,
      password: password,
    });
  }

  signUpKlijent(value: any) {
    return this.http.post(`${this.url}/Auth/registerKlijent`, {
      username: value.username,
      password: value.password,
      email: value.email,
      jurassicAccount: value.jurassicAccount,
      stateOfOrigin: value.stateOfOrigin,
      nazivKompanije: value.nazivKompanije,
      tipPreduzeca: value.tipPreduzeca,
    });
  }

  signUpReporter(value: any) {
    return this.http.post(`${this.url}/Auth/registerReporter`, {
      username: value.username,
      email: value.email,
      password: value.password,
      stateOfOrigin: value.stateOfOrigin,
      jurassicAccount: value.jurassicAccount,
      ime: value.firstName,
      prezime: value.lastName,
    });
  }

  verifyAccount(token: string) {
    return this.http.post(`${this.url}/Auth/verify`, {
      token: token,
      email: this.user.email,
    });
  }

  resendVerification() {
    return this.http.post(
      `${this.url}/Auth/resendVerificationEmail`,
      {
        email: this.user.email,
      }
    );
  }

  refresh(token: string) {
    return this.http.get(`${this.url}/user/refreshToken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  forgotPasswordEmail(email: string) {
    return this.http.post(`${this.url}/Auth/forgotPassword`, {
      email: email,
    });
  }

  forgotPassword(token: string, password: string) {
    return this.http.post(`${this.url}/Auth/resetPassword`, {
      token: token,
      email: this.forgotEmail,
      password: password,
    });
  }

  getArticles() {
    return this.http.get(`${this.url}/article/articles`);
  }

  addArticle(value: any, image: File | null, file: File | null) {
    const formData = new FormData();
    formData.append('Title', value.title);
    formData.append('Content', value.content);
    formData.append('Price', value.price);
    formData.append('CategoryId', value.category);
    if (image != null) formData.append('Image', image);
    if (file != null) formData.append('File', file);
    return this.http.post(
      `${this.url}/article/addArticle`,
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + this.user.token,
        },
      }
    );
  }

  getArticle(id: string) {
    return this.http.get(`${this.url}/article/getArticle/${id}`);
  }

  buyArticle(id: string, jurassicAccount: string) {
    return this.http.post(
      `${this.url}/article/buyArticle`,
      {
        ArticleId: parseInt(id),
        JurassicAccount: jurassicAccount,
      },
      {
        headers: {
          Authorization: 'Bearer ' + this.user.token,
        },
      }
    );
  }

  changeUsername(username: string) {
    return this.http.post(
      `${this.url}/user/changeUsername`,
      {
        username: username,
      },
      {
        headers: {
          Authorization: 'Bearer ' + this.user.token,
        },
      }
    );
  }

  changePassword(password: string, oldPassword: string) {
    return this.http.post(
      `${this.url}/user/changePassword`,
      {
        password: password,
        oldPassword: oldPassword,
      },
      {
        headers: {
          Authorization: 'Bearer ' + this.user.token,
        },
      }
    );
  }

  uploadPicture(image: File) {
    const formData = new FormData();
    formData.append('ProfilePicture', image);
    return this.http.post(
      `${this.url}/user/profileImage`,
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + this.user.token,
        },
      }
    );
  }

  deleteImage() {
    return this.http.delete(
      `${this.url}/user/deleteProfileImage`,
      {
        headers: {
          Authorization: 'Bearer ' + this.user.token,
        },
      }
    );
  }

  deleteAccount(password: string) {
    return this.http.post(
      `${this.url}/user/deleteProfile`,
      {
        password: password,
      },
      {
        headers: {
          Authorization: 'Bearer ' + this.user.token,
        },
      }
    );
  }

  getBoughtArticles() {
    return this.http.get(`${this.url}/article/boughtArticles`, {
      headers: {
        Authorization: 'Bearer ' + this.user.token,
      },
    });
  }

  getReportersArticles() {
    return this.http.get(`${this.url}/article/usersArticles`, {
      headers: {
        Authorization: 'Bearer ' + this.user.token,
      },
    });
  }

  getPersonalArticles(id: string) {
    return this.http.get(
      `${this.url}/article/personalArticles/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + this.user.token,
        },
      }
    );
  }

  deleteArticle(id: string) {
    return this.http.delete(
      `${this.url}/article/deleteArticle/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + this.user.token,
        },
      }
    );
  }
}
