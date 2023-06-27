import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CustomService } from './custom.service';

@Injectable({
  providedIn: 'root',
})
export class ReporterGuard {
  role = -1;
  constructor(private service: CustomService) {
    this.service.role.subscribe((value) => {
      this.role = value;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.role == 0) {
      return true;
    } else {
      // this.router.navigate(['/login']);
      return false;
    }
  }
}
