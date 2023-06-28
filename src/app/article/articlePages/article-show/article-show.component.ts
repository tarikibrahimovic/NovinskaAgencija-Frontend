import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomService } from 'src/app/custom.service';

@Component({
  selector: 'app-article-show',
  templateUrl: './article-show.component.html',
  styleUrls: ['./article-show.component.css'],
})
export class ArticleShowComponent {
  /**
   *
   */
  constructor(public service: CustomService, private router: Router) {
    this.service.role.subscribe((value) => {
      this.role = value;
    });
  }
  category = '';
  reporters: any = [];
  filteredArticles: any = [];

  role: number = -1;
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  addPage() {
    this.router.navigate(['/add-article']);
  }

  ngOnInit(): void {
    this.service.getArticles().subscribe((result: any) => {
      this.service.articles = result;
      this.filteredArticles = result;
      this.reporters = result
        .map((data: any) => {
          return { ime: data.ime, prezime: data.prezime, id: data.reporterId };
        })
        .filter(
          (data: any, index: any, self: any) =>
            index ===
            self.findIndex(
              (t: any) => t.ime === data.ime && t.prezime === data.prezime
            )
        );
    });
  }

  openDialog(article: any) {
    console.log('nesto');
  }

  sort(value: string) {
    this.category = value;
    if (value == 'all') {
      this.filteredArticles = this.service.articles;
      return;
    }
    this.filteredArticles = this.service.articles.filter((data: any) => {
      return data.name == value;
    });
    console.log(this.filteredArticles);
  }

  categories = [
    { value: 'Politics', viewValue: 'Politics' },
    { value: 'Entertainment', viewValue: 'Entertainment' },
    { value: 'Business', viewValue: 'Business' },
    { value: 'Sports', viewValue: 'Sports' },
    { value: 'Crime', viewValue: 'Crime' },
    { value: 'Education', viewValue: 'Education' },
    { value: 'City Council News', viewValue: 'News' },
    { value: 'Tech', viewValue: 'Tech' },
  ];

  linkIt(id: number) {
    this.router.navigate(['article', id]);
  }

  changeReporter(id: number) {
    this.filteredArticles = this.service.articles.filter((data: any) => {
      return data.reporterId == id && data.name == this.category;
    });
  }
}
