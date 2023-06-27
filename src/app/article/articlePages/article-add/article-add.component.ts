import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomService } from 'src/app/custom.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-add',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css'],
})
export class ArticleAddComponent {
  forms = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    image: new FormControl(''),
    file: new FormControl(''),
    price: new FormControl('', [Validators.required]),
    category: new FormControl('', Validators.required),
  });

  file: File | null = null;
  image: File | null = null;
  isLoading = false;
  constructor(private service: CustomService, private router: Router) {}

  proba() {
    if (!this.forms.valid) {
      alert('All fields are required');
      return;
    }
    const price = Number(this.forms.value.price);
    if (isNaN(price) || price < 0) {
      alert('Price must be a positive number');
      return;
    } else if (
      this.file !== null &&
      this.file?.type !== 'application/pdf' &&
      this.file?.type !==
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      alert('File must be pdf or docx');
      return;
    } else if (
      this.image !== null &&
      this.image?.type !== 'image/jpeg' &&
      this.image?.type !== 'image/png'
    ) {
      alert('Image must be jpeg or png');
      return;
    } else {
      this.isLoading = true;
      this.service
        .addArticle(this.forms.value, this.image, this.file)
        .subscribe(
          (res: any) => {
            console.log(res);

            this.router.navigate(['/article']);
            this.isLoading = false;
          },
          (err: any) => {
            console.log(err);
            this.isLoading = false;
          }
        );
    }
  }

  onImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files.item(0);
    this.image = file;
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files.item(0);
    this.file = file;
  }
}
