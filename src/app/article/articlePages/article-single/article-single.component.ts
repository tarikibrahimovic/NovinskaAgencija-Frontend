import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomService } from 'src/app/custom.service';

@Component({
  selector: 'app-article-single',
  templateUrl: './article-single.component.html',
  styleUrls: ['./article-single.component.css'],
})
export class ArticleSingleComponent {
  /**
   *
   */

  articleId = this.route.snapshot.paramMap.get('id') as string;
  article: any = {};
  constructor(
    private route: ActivatedRoute,
    private service: CustomService,
    private router: Router
  ) {
    this.service.getArticle(this.articleId).subscribe(
      (result: any) => {
        this.article = result;
        if (this.article == null) {
          this.router.navigate(['/error']);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  linkIt() {
    this.router.navigate(['/articleBuy/', this.articleId]);
  }
}
