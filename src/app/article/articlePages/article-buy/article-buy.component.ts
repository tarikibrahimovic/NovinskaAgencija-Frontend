import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomService } from 'src/app/custom.service';

@Component({
  selector: 'app-article-buy',
  templateUrl: './article-buy.component.html',
  styleUrls: ['./article-buy.component.css'],
})
export class ArticleBuyComponent {
  error = '';
  articleId = this.route.snapshot.paramMap.get('id') as string;
  isLoading = false;

  forms = new FormGroup({
    jurassicAccount: new FormControl('', [Validators.required]),
  });

  constructor(private service: CustomService, private route: ActivatedRoute) {}

  buy() {
    if (this.forms.invalid) {
      this.error = 'Invalid form';
      return;
    }
    const price = Number(this.forms.value.jurassicAccount);
    if (isNaN(price) || price < 0) {
      alert('Price must be a positive number');
      return;
    }
    this.isLoading = true;
    this.service
      .buyArticle(this.articleId, this.forms.value.jurassicAccount as string)
      .subscribe(
        (result: any) => {
          this.service.articles = result;
          this.isLoading = false;
        },
        (error: any) => {
          this.error = error.error;
          this.isLoading = false;
        }
      );
  }
}
