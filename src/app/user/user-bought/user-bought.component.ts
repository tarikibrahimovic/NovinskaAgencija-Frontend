import { Component } from '@angular/core';
import { CustomService } from 'src/app/custom.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-bought',
  templateUrl: './user-bought.component.html',
  styleUrls: ['./user-bought.component.css']
})
export class UserBoughtComponent {
  constructor(public service: CustomService, private router: Router) {
    this.service.role.subscribe((value) => {
      this.role = value;
    });
    setTimeout(() => {
    this.service.getBoughtArticles().subscribe((result: any) => {
      // console.log(this.service.user.clanci.$values);
      this.filteredArticles = result.$values;
      console.log(this.filteredArticles);
    });
    }, 1500);
  }
  category = '';
  reporters: any = [];
  filteredArticles: any = [];

  role: number = -1;

  proba() {
    console.log(this.service.user.clanci.$values[0].id);
  }

  linkIt(id: number) {
    this.router.navigate(['/articlePersonal/', id]);
  }
}
