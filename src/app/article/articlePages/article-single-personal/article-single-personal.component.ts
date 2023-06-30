import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomService } from 'src/app/custom.service';

@Component({
  selector: 'app-article-single-personal',
  templateUrl: './article-single-personal.component.html',
  styleUrls: ['./article-single-personal.component.css'],
})
export class ArticleSinglePersonalComponent {
  constructor(
    public service: CustomService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    setTimeout(() => {
    this.service
      .getPersonalArticles(this.articleId)
      .subscribe((result: any) => {
        this.article = result;
        console.log(this.article);
        if (this.article == null) {
          this.router.navigate(['/error']);
        }
      }), (error: any) => {
        // console.log(error);
        this.router.navigate(['/library'])
      };
    }, 1500);
  }

  article: any = {};
  error = '';
  articleId = this.route.snapshot.paramMap.get('id') as string;
  isLoading = false;

  deleteArticle() {
    this.service.deleteArticle(this.articleId).subscribe((result: any) => {
      alert('Article deleted successfully!');
      if(this.service.user.clanci !== null && this.service.user.clanci !== undefined){
      this.service.user.clanci = this.service.user.clanci.$values.filter(
        (data: any) => {
          return data.id != this.articleId;
        }
      );
      // console.log(this.service.user.clanci.$values);
      // console.log(result);
      this.router.navigate(['/library']);
      }
      else{
        this.router.navigate(['/bought']);
      }
    }, (error: any) => {
      console.log(error.error.error);
      alert(error.error.error);
    });
  }

  proba(){
    console.log(this.service.user.clanci.$values);
  }
}
