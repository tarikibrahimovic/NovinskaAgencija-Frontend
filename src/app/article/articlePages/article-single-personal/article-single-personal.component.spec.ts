import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSinglePersonalComponent } from './article-single-personal.component';

describe('ArticleSinglePersonalComponent', () => {
  let component: ArticleSinglePersonalComponent;
  let fixture: ComponentFixture<ArticleSinglePersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleSinglePersonalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleSinglePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
