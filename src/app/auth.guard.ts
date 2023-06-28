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
  constructor(private service: CustomService, private router: Router) {
    this.service.isLoggedIn.subscribe((value) => {
      this.loggedIn = value;
    }
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any {
    if (this.service.getLoginStatus()) {
      this.router.navigate(['/'])
      // return false;
    } else {
      return true;
    }
  }
}
