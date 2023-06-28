import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomService {
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
  }

  login(email: string, password: string) {
    return this.http.post('https://localhost:7121/api/Auth/login', {
      email: email,
      password: password,
    });
  }

  signUpKlijent(value: any) {
    return this.http.post('https://localhost:7121/api/Auth/registerKlijent', {
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
    return this.http.post('https://localhost:7121/api/Auth/registerReporter', {
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
    return this.http.post('https://localhost:7121/api/Auth/verify', {
      token: token,
      email: this.user.email,
    });
  }

  resendVerification() {
    return this.http.post(
      'https://localhost:7121/api/Auth/resendVerificationEmail',
      {
        email: this.user.email,
      }
    );
  }

  refresh(token: string) {
    return this.http.get('https://localhost:7121/api/user/refreshToken', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  forgotPasswordEmail(email: string) {
    return this.http.post('https://localhost:7121/api/Auth/forgotPassword', {
      email: email,
    });
  }

  forgotPassword(token: string, password: string) {
    return this.http.post('https://localhost:7121/api/Auth/resetPassword', {
      token: token,
      email: this.forgotEmail,
      password: password,
    });
  }

  getArticles() {
    return this.http.get('https://localhost:7121/api/article/articles');
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
      'https://localhost:7121/api/article/addArticle',
      formData,
      {
        headers: {
          Authorization: 'Bearer ' + this.user.token,
        },
      }
    );
  }

  getArticle(id: string) {
    return this.http.get(`https://localhost:7121/api/article/getArticle/${id}`);
  }

  buyArticle(id: string, jurassicAccount: string) {
    return this.http.post(
      `https://localhost:7121/api/article/buyArticle`,
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
      'https://localhost:7121/api/user/changeUsername',
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
      'https://localhost:7121/api/user/changePassword',
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
      'https://localhost:7121/api/user/profileImage',
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
      'https://localhost:7121/api/user/deleteProfileImage',
      {
        headers: {
          Authorization: 'Bearer ' + this.user.token,
        },
      }
    );
  }

  deleteAccount(password: string) {
    return this.http.post(
      'https://localhost:7121/api/user/deleteProfile',
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
    return this.http.get('https://localhost:7121/api/article/boughtArticles', {
      headers: {
        Authorization: 'Bearer ' + this.user.token,
      },
    });
  }

  getReportersArticles(){
    return this.http.get('https://localhost:7121/api/article/usersArticles', {
      headers: {
        Authorization: 'Bearer ' + this.user.token,
      },
    });
  }

  getPersonalArticles(id: string) {
    return this.http.get(
      `https://localhost:7121/api/article/personalArticles/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + this.user.token,
        },
      }
    );
  }

  deleteArticle(id: string) {
    return this.http.delete(
      `https://localhost:7121/api/article/deleteArticle/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + this.user.token,
        },
      }
    );
  }
}
