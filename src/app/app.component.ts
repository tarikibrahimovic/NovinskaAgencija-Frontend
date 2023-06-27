import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CustomService } from './custom.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showNavbar = true;
  role = -1;

  constructor(private router: Router, public service: CustomService) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar =
          event.url !== '/login' &&
          event.url !== '/register' &&
          event.url !== '/verify' &&
          event.url !== '/forgot-password-email' &&
          event.url !== '/forgot-password-reset';
      }
    });

    // this.service.getArticles().subscribe((result: any) => {
    //   this.service.articles = result;
    // });

    if (
      localStorage.getItem('jwt') != null &&
      localStorage.getItem('email') != null
    ) {
      this.service.refresh(localStorage.getItem('jwt') as string).subscribe((result: any) => {
        this.service.user = result;
        
        this.service.setLoginStatus(true);
        this.service.setRole(result.role);
      });
    }
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    this.service.user = null;
    this.service.setLoginStatus(false);
    this.service.setRole(-1);
    this.router.navigate(['/login']);
  }
}
