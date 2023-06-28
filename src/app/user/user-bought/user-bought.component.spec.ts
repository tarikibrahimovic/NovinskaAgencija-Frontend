import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBoughtComponent } from './user-bought.component';

describe('UserBoughtComponent', () => {
  let component: UserBoughtComponent;
  let fixture: ComponentFixture<UserBoughtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBoughtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBoughtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
