import { Injectable } from '@angular/core';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { CustomService } from './custom.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard {
  /**
   *
   */
  loggedIn = false;
  token = '';
  constructor(private service: CustomService, private router: Router) {
    this.service.isLoggedIn.subscribe((value) => {
      this.loggedIn = value;
    }
    );
    this.token = localStorage.getItem('jwt') as string;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any {
    if (this.token == null) {
      this.router.navigate(['/'])
      // return false;
    } else {
      return true;
    }
  }
}
